// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureSyndicate is SepoliaConfig {
    using FHE for *;
    
    struct SyndicateMember {
        euint32 memberId;
        euint32 reputation;
        euint32 contributionAmount;
        bool isActive;
        bool isVerified;
        address memberAddress;
        uint256 joinTime;
        uint256 lastActivity;
    }
    
    struct SyndicateProject {
        euint32 projectId;
        euint32 targetAmount;
        euint32 currentAmount;
        euint32 memberCount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Investment {
        euint32 investmentId;
        euint32 amount;
        euint32 expectedReturn;
        address investor;
        uint256 timestamp;
    }
    
    struct ProfitDistribution {
        euint32 distributionId;
        euint32 totalProfit;
        euint32 memberCount;
        bool isDistributed;
        address distributor;
        uint256 timestamp;
    }
    
    mapping(uint256 => SyndicateMember) public members;
    mapping(uint256 => SyndicateProject) public projects;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => ProfitDistribution) public distributions;
    mapping(address => euint32) public memberReputation;
    mapping(address => euint32) public memberContribution;
    
    uint256 public memberCounter;
    uint256 public projectCounter;
    uint256 public investmentCounter;
    uint256 public distributionCounter;
    
    address public owner;
    address public verifier;
    euint32 public totalSyndicateValue;
    euint32 public totalMembers;
    
    event MemberJoined(uint256 indexed memberId, address indexed memberAddress, uint32 reputation);
    event ProjectCreated(uint256 indexed projectId, address indexed creator, string name);
    event InvestmentMade(uint256 indexed investmentId, uint256 indexed projectId, address indexed investor, uint32 amount);
    event ProfitDistributed(uint256 indexed distributionId, uint32 totalProfit, uint32 memberCount);
    event MemberVerified(uint256 indexed memberId, bool isVerified);
    event ReputationUpdated(address indexed member, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        totalSyndicateValue = FHE.asEuint32(0);
        totalMembers = FHE.asEuint32(0);
    }
    
    function joinSyndicate(
        externalEuint32 reputation,
        externalEuint32 initialContribution,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(memberReputation[msg.sender] == FHE.asEuint32(0), "Member already exists");
        
        uint256 memberId = memberCounter++;
        
        // Convert external values to internal encrypted values
        euint32 internalReputation = FHE.fromExternal(reputation, inputProof);
        euint32 internalContribution = FHE.fromExternal(initialContribution, inputProof);
        
        members[memberId] = SyndicateMember({
            memberId: FHE.asEuint32(0), // Will be set properly later
            reputation: internalReputation,
            contributionAmount: internalContribution,
            isActive: true,
            isVerified: false,
            memberAddress: msg.sender,
            joinTime: block.timestamp,
            lastActivity: block.timestamp
        });
        
        memberReputation[msg.sender] = internalReputation;
        memberContribution[msg.sender] = internalContribution;
        
        // Update syndicate totals
        totalMembers = FHE.add(totalMembers, FHE.asEuint32(1));
        totalSyndicateValue = FHE.add(totalSyndicateValue, internalContribution);
        
        emit MemberJoined(memberId, msg.sender, 0); // Reputation will be decrypted off-chain
        return memberId;
    }
    
    function createProject(
        string memory _name,
        string memory _description,
        uint256 _targetAmount,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Project name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(memberReputation[msg.sender] != FHE.asEuint32(0), "Only members can create projects");
        
        uint256 projectId = projectCounter++;
        
        projects[projectId] = SyndicateProject({
            projectId: FHE.asEuint32(0), // Will be set properly later
            targetAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentAmount: FHE.asEuint32(0),
            memberCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit ProjectCreated(projectId, msg.sender, _name);
        return projectId;
    }
    
    function makeInvestment(
        uint256 projectId,
        externalEuint32 amount,
        externalEuint32 expectedReturn,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(projects[projectId].creator != address(0), "Project does not exist");
        require(projects[projectId].isActive, "Project is not active");
        require(block.timestamp <= projects[projectId].endTime, "Project has ended");
        require(memberReputation[msg.sender] != FHE.asEuint32(0), "Only members can invest");
        
        uint256 investmentId = investmentCounter++;
        
        // Convert external values to internal encrypted values
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalExpectedReturn = FHE.fromExternal(expectedReturn, inputProof);
        
        investments[investmentId] = Investment({
            investmentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            expectedReturn: internalExpectedReturn,
            investor: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update project totals
        projects[projectId].currentAmount = FHE.add(projects[projectId].currentAmount, internalAmount);
        projects[projectId].memberCount = FHE.add(projects[projectId].memberCount, FHE.asEuint32(1));
        
        // Update member contribution
        memberContribution[msg.sender] = FHE.add(memberContribution[msg.sender], internalAmount);
        
        emit InvestmentMade(investmentId, projectId, msg.sender, 0); // Amount will be decrypted off-chain
        return investmentId;
    }
    
    function distributeProfits(
        uint256 projectId,
        externalEuint32 totalProfit,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(projects[projectId].creator == msg.sender, "Only project creator can distribute profits");
        require(projects[projectId].isActive, "Project must be active");
        
        uint256 distributionId = distributionCounter++;
        
        // Convert external value to internal encrypted value
        euint32 internalTotalProfit = FHE.fromExternal(totalProfit, inputProof);
        
        distributions[distributionId] = ProfitDistribution({
            distributionId: FHE.asEuint32(0), // Will be set properly later
            totalProfit: internalTotalProfit,
            memberCount: projects[projectId].memberCount,
            isDistributed: true,
            distributor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ProfitDistributed(distributionId, 0, 0); // Values will be decrypted off-chain
        return distributionId;
    }
    
    function verifyMember(uint256 memberId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify members");
        require(members[memberId].memberAddress != address(0), "Member does not exist");
        
        members[memberId].isVerified = isVerified;
        emit MemberVerified(memberId, isVerified);
    }
    
    function updateReputation(address member, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(member != address(0), "Invalid member address");
        require(memberReputation[member] != FHE.asEuint32(0), "Member does not exist");
        
        memberReputation[member] = reputation;
        emit ReputationUpdated(member, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getMemberInfo(uint256 memberId) public view returns (
        uint8 reputation,
        uint8 contributionAmount,
        bool isActive,
        bool isVerified,
        address memberAddress,
        uint256 joinTime,
        uint256 lastActivity
    ) {
        SyndicateMember storage member = members[memberId];
        return (
            0, // FHE.decrypt(member.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(member.contributionAmount) - will be decrypted off-chain
            member.isActive,
            member.isVerified,
            member.memberAddress,
            member.joinTime,
            member.lastActivity
        );
    }
    
    function getProjectInfo(uint256 projectId) public view returns (
        string memory name,
        string memory description,
        uint8 targetAmount,
        uint8 currentAmount,
        uint8 memberCount,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 startTime,
        uint256 endTime
    ) {
        SyndicateProject storage project = projects[projectId];
        return (
            project.name,
            project.description,
            0, // FHE.decrypt(project.targetAmount) - will be decrypted off-chain
            0, // FHE.decrypt(project.currentAmount) - will be decrypted off-chain
            0, // FHE.decrypt(project.memberCount) - will be decrypted off-chain
            project.isActive,
            project.isVerified,
            project.creator,
            project.startTime,
            project.endTime
        );
    }
    
    function getInvestmentInfo(uint256 investmentId) public view returns (
        uint8 amount,
        uint8 expectedReturn,
        address investor,
        uint256 timestamp
    ) {
        Investment storage investment = investments[investmentId];
        return (
            0, // FHE.decrypt(investment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(investment.expectedReturn) - will be decrypted off-chain
            investment.investor,
            investment.timestamp
        );
    }
    
    function getMemberReputation(address member) public view returns (uint8) {
        return 0; // FHE.decrypt(memberReputation[member]) - will be decrypted off-chain
    }
    
    function getMemberContribution(address member) public view returns (uint8) {
        return 0; // FHE.decrypt(memberContribution[member]) - will be decrypted off-chain
    }
    
    function getSyndicateStats() public view returns (
        uint8 totalValue,
        uint8 memberCount
    ) {
        return (
            0, // FHE.decrypt(totalSyndicateValue) - will be decrypted off-chain
            0  // FHE.decrypt(totalMembers) - will be decrypted off-chain
        );
    }
    
    function withdrawFunds(uint256 projectId) public {
        require(projects[projectId].creator == msg.sender, "Only creator can withdraw");
        require(projects[projectId].isVerified, "Project must be verified");
        require(block.timestamp > projects[projectId].endTime, "Project must be ended");
        
        // Transfer funds to creator
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        projects[projectId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
