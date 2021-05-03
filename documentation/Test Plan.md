# Test plan

## 1.	Introduction
### 1.1	Purpose
The purpose of the Iteration Test Plan is to gather all of the information necessary to plan and control the test effort for a given iteration. 
It describes the approach to testing the software.
This Test Plan for **cooken** supports the following objectives:
-	Identifies the items that should be targeted by the tests.
-	Identifies the motivation for and ideas behind the test areas to be covered.
-	Outlines the testing approach that will be used.
-	Identifies the required resources and provides an estimate of the test efforts.

### 1.2	Scope
This document describes the used tests, as they are unit tests and functionality testing.

### 1.3	Intended Audience
The sole purpose of this document is for internal documentation only.

### 1.4	Document Terminology and Acronyms
| Abbreviation | Meaning                             |
|--------------|-------------------------------------|
| API          | Application Programmable Interface  |
| N/A          | not applicable                      |
| SRS          | Software Requirements Specification |
| TBD          | to be determined                    |

### 1.5	 References
| Reference            | 
| ---------------------|
| [SAD](../SAD/SAD.md) | 
| [UseCases](../UC)    |
            
## 2.	Evaluation Mission and Test Motivation
### 2.1	Background
We test our project code to make sure our code does what we've written it to do. This is done to make sure, that our application does not encounter any unexpected errors.
### 2.2	Evaluation Mission
The purpose of this plan is to analyze (and possible optimize) software testing which is a severe step to reach our product goal.
### 2.3	Test Motivators
The testing is the result of the want to mitigate risks and make the product as stable and bug-free as possible.

## 3.	Target Test Items
The following list shows which systems (as part of our product) will be tested.

- cooken UI (visible end)
- Recipe / Ingredient Database (non-visible end)

## 4.	Outline of Planned Tests
### 4.1	Outline of Test Inclusions
Visible end: 
- Search by Title
- Search by Min. Rating
- Search by Max. Time
- Search by Max. Difficulty
- Search by Two (Title and Min. Rating)

Non-visible end:
- Search by Ingredient
- Search by Tag
- Search by multiple Filters
### 4.2	Outline of Other Candidates for Potential Inclusion
- Search algorithm testing (in how far the results represent the clients search intention)
- Finding potential Search bugs
### 4.3 Outline of Test Exclusions
- Stress Tests
- Load / Performance Tests

## 5.	Test Approach
### 5.1 Initital Test-Idea Catalogs and Other Reference Sources
**n/a**
### 5.2	Testing Techniques and Types
#### 5.2.1 Node.js Mocha Backend Testing
|| |
|---|---|
|Technique Objective  	| Run the backend server and request data from DB tables to make sure Search inquiries are working fine |
|Technique 		|  Serial testing with accurate reporting, map uncaught exceptions to correct test cases |
|Oracles 		| Correct data is delivered by the backend system |
|Required Tools 	| Node.js server, Mocha framework |
|Success Criteria	| expected data, faulty amount |
|Special Considerations	|     -          |

#### 5.2.2 Cucumber (JS plugin) Frontend Testing
|| |
|---|---|
|Technique Objective  	| Every possible UI scenario should work flawless  |
|Technique 		| Cucumber testing by integrating a special JS plugin into IntelliJ and running earlier specified .feature files  |
|Oracles 		| The site looks as expected after performing a scenario |
|Required Tools 	| Cucumber JS plugin |
|Success Criteria	| Amount of tests passed |
|Special Considerations	|     -          |

#### 5.2.3 Business Cycle Testing
**n/a**

#### 5.2.4 User Interface Testing
**n/a**

#### 5.2.5 Performance Profiling 
**n/a**

#### 5.2.6 Load Testing
**n/a**

#### 5.2.7 Stress Testing
**n/a**

#### 5.2.8	Volume Testing
**n/a**

#### 5.2.9	Security and Access Control Testing
**n/a**

#### 5.2.10	Failover and Recovery Testing
**n/a**

#### 5.2.11	Configuration Testing
**n/a**

#### 5.2.12	Installation Testing
**n/a**

## 6.	Entry and Exit Criteria
### 6.1	Test Plan
#### 6.1.1	Test Plan Entry Criteria
Tests are ran manually.
#### 6.1.2	Test Plan Exit Criteria
All Tests pass without faulty.
#### 6.1.3 Suspension and Resumption Criteria
n/a

## 7.	Deliverables
### 7.1	Test Evaluation Summaries
Printed directly into the IDE:

![](https://github.com/kuscu0/cooken/blob/master/documentation/testing/intellij_testing_result.png)

### 7.2	Reporting on Test Coverage
Coverage returned by npm:

![](https://github.com/kuscu0/cooken/blob/master/documentation/testing/npm_coverage.png)

### 7.3	Perceived Quality Reports
n/a
### 7.4	Incident Logs and Change Requests
n/a
### 7.5	Smoke Test Suite and Supporting Test Scripts
n/a
### 7.6	Additional Work Products
#### 7.6.1	Detailed Test Results
**n/a**
#### 7.6.2	Additional Automated Functional Test Scripts
**n/a**
#### 7.6.3	Test Guidelines
**n/a**
#### 7.6.4	Traceability Matrices
**n/a**

## 8.	Testing Workflow
No testing workflow exists yet, all tests are executed locally and manually.
## 9.	Environmental Needs
### 9.1	Base System Hardware
The following table sets forth the system resources for the test effort presented in this Test Plan.

| Resource | Quantity | Name and Type |
|---|---|---|
| Production Server | 1 | Web Server / Database Server |
| GitHub CI/CD |  | Building and deploying the application |

### 9.2	Base Software Elements in the Test Environment
The following base software elements are required in the test environment for this Test Plan.

| Software Element Name | Version | Type and Other Notes |
|---|---|---|
| Windows | latest | Operating System |
| NodeJS | latest | Web Server |
| MongoDB | latest | Database |

### 9.3	Productivity and Support Tools
The following tools will be employed to support the test process for this Test Plan.

| Tool Category or Type | Tool Brand Name                              |
|-----------------------|----------------------------------------------|
| Code Hoster           | [github.com](https://github.com/kuscu0/cooken) |
| CI Service            |  [github.com](https://github.com/kuscu0/cooken) |

### 9.4	Test Environment Configurations
n/a 

## 10.	Responsibilities, Staffing, and Training Needs
### 10.1	People and Roles

| Role | Assigned to |	Specific Responsibilities or Comments |
|---|---|---|
| Test Manager | Dominik | Provides management oversight. <br> Responsibilities include: <br> planning and logistics <br> agree mission <br> identify motivators<br> acquire appropriate resources<br> present management reporting<br> advocate the interests of test<br>evaluate effectiveness of test effort |
| Test Designer | Arthur | Defines the technical approach to the implementation of the test effort. <br> Responsibilities include:<br> define test approach<br> define test automation architecture<br> verify test techniques<br> define testability elements<br> structure test implementation|

### 10.2	Staffing and Training Needs
**n/a**
## 11.	Iteration Milestones

| Milestone | Planned Start Date | Actual Start Date | Planned End Date | Actual End Date |
|---|---|---|---|---|

## 12.	Risks, Dependencies, Assumptions, and Constraints
| Risk | Mitigation Strategy	| Contingency (Risk is realized) |
|---|---|---|

## 13. Management Process and Procedures
**n/a**
