## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| Quakecoin2.sol | d8550853150e915169cad3962b1031d20bddeb9f |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **IERC20** | Interface |  |||
| └ | totalSupply | External ❗️ |   |NO❗️ |
| └ | balanceOf | External ❗️ |   |NO❗️ |
| └ | allowance | External ❗️ |   |NO❗️ |
| └ | transfer | External ❗️ | 🛑  |NO❗️ |
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | External ❗️ | 🛑  |NO❗️ |
||||||
| **ApproveAndCallFallBack** | Implementation |  |||
| └ | receiveApproval | Public ❗️ | 🛑  |NO❗️ |
||||||
| **TransferAndCallFallBack** | Implementation |  |||
| └ | receiveToken | Public ❗️ | 🛑  |NO❗️ |
||||||
| **SafeMath** | Library |  |||
| └ | mul | Internal 🔒 |   | |
| └ | div | Internal 🔒 |   | |
| └ | sub | Internal 🔒 |   | |
| └ | add | Internal 🔒 |   | |
| └ | ceil | Internal 🔒 |   | |
||||||
| **ERC20Detailed** | Implementation | IERC20 |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | name | Public ❗️ |   |NO❗️ |
| └ | symbol | Public ❗️ |   |NO❗️ |
| └ | decimals | Public ❗️ |   |NO❗️ |
||||||
| **Quakecoin2** | Implementation | ERC20Detailed |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | ERC20Detailed |
| └ | transferOwnership | Public ❗️ | 🛑  |NO❗️ |
| └ | totalSupply | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | fullUnitsStaked | Public ❗️ |   |NO❗️ |
| └ | toFullUnits | Public ❗️ |   |NO❗️ |
| └ | allowance | Public ❗️ |   |NO❗️ |
| └ | transfer | Public ❗️ | 🛑  |NO❗️ |
| └ | transferAndCall | Public ❗️ | 🛑  |NO❗️ |
| └ | multiTransfer | Public ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | transferFromAndCall | Public ❗️ | 🛑  |NO❗️ |
| └ | approve | Public ❗️ | 🛑  |NO❗️ |
| └ | approveAndCall | Public ❗️ | 🛑  |NO❗️ |
| └ | increaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | decreaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | _mint | Internal 🔒 | 🛑  | |
| └ | burn | External ❗️ | 🛑  |NO❗️ |
| └ | burnFrom | External ❗️ | 🛑  |NO❗️ |
| └ | _burn | Internal 🔒 | 🛑  | |
| └ | _executeTransfer | Private 🔐 | 🛑  | |
| └ | updateRewardsFor | Private 🔐 | 🛑  | |
| └ | viewUnpaidRewards | Public ❗️ |   |NO❗️ |
| └ | payoutRewards | Public ❗️ | 🛑  |NO❗️ |
| └ | enableStaking | Public ❗️ | 🛑  |NO❗️ |
| └ | disableStaking | Public ❗️ | 🛑  |NO❗️ |
| └ | enableStakingFor | Public ❗️ | 🛑  | onlyOwner |
| └ | disableStakingFor | Public ❗️ | 🛑  | onlyOwner |
| └ | _enableStaking | Private 🔐 | 🛑  | |
| └ | _disableStaking | Private 🔐 | 🛑  | |
| └ | withdrawERC20Tokens | Public ❗️ | 🛑  | onlyOwner |
| └ | setWhitelistedTo | External ❗️ | 🛑  | onlyOwner |
| └ | setWhitelistedFrom | External ❗️ | 🛑  | onlyOwner |
| └ | multiMigrateBalance | Public ❗️ | 🛑  |NO❗️ |
| └ | migrateBalance | Public ❗️ | 🛑  | onlyOwner |
| └ | endMigration | Public ❗️ | 🛑  | onlyOwner |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
