Project - cooken | Software Requirements Specification
======
Version <1.0>
======

- [#Revision History](#-revision-history)
- [1. Introduction](#1-introduction)
  * [1.1 Purpose](#11-purpose)
  * [1.2 Scope](#12-scope)
  * [1.3 Definitions, Acronyms and Abbreviations](#13-definitions--acronyms-and-abbreviations)
  * [1.4 References](#14-references)
  * [1.5 Overview](#15-overview)
- [2. Overall Description](#2-overall-description)
  * [2.1 Vision](#21-vision)
  * [2.2 Use Case Diagram](#22-use-case-diagram)
  * [2.3 Technology Stack](#23-technology-stack)
- [3. Specific Requirements](#3-specific-requirements)
  * [3.1 Functionality](#31-functionality)
    + [3.1.1 Functional Requirement One](#311-functional-requirement-one)
- [3.2 Usability](#32-usability)
  * [3.2.1 Usability Requirement One](#321-usability-requirement-one)
- [3.3 Reliability](#33-reliability)
  * [3.3.1 Reliability Requirement One](#331-reliability-requirement-one)
- [3.4 Performance](#34-perfomance)
  * [3.4.1 Performance Requirement One](#341-performance-requirement-one)
  * [3.5 Supportability](#35-supportability)
    + [3.5.1 Supportability Requirement One](#351-supportability-requirement-one)
  * [3.6 Design Constraints](#36-design-constraints)
    + [3.6.1 Design Constraint One](#361--design-constraint-one-)
  * [3.7 On-line User Documentation and Help System Requirements](#37-on-line-user-documentation-and-help-system-requirements)
  * [3.8 Purchased Components](#38-purchased-components)
  * [3.9 Interfaces](#39-interfaces)
    + [3.9.1 User Interfaces](#391-user-interfaces)
    + [3.9.2 Hardware Interfaces](#392-hardware-interfaces)
    + [3.9.3 Software Interfaces](#393-software-interfaces)
    + [3.9.4 Communications Interfaces](#394-communications-interfaces)
  * [3.10 Licensing Requirements](#310-licensing-requirements)
  * [3.11 Legal, Copyright, and Other Notices](#311-legal--copyright--and-other-notices)
  * [3.12 Applicable Standards](#312-applicable-standards)
- [4. Supporting Information](#4-supporting-information)

# Revision History
-----

|    Date    | Version | Description | Author |
|------------|---------|-------------|--------|
| 15.10.2020 |   1.0   |  <details>  | <name> |

## 1. Introduction
[The introduction of the Software Requirements Specification (SRS) should provide an overview of the entire SRS. It should include the purpose, scope, definitions, acronyms, 
abbreviations, references, and overview of the SRS.]
[Note: The Software Requirements Specification (SRS) captures the complete software requirements for the system, or a portion of the system.  Following is a typical SRS 
outline for a project using only traditional natural-language style requirements – with no use-case modeling.  It captures all requirements in a single document,  with  
applicable sections inserted from the  Supplementary Specifications (which would no longer be needed).  For a template of an SRS using use-case modeling, which consists of 
a package containing Use-Cases of the use-case model and applicable Supplementary Specifications and other supporting information, see rup_SRS-uc.dot.]
[Many different arrangements of an SRS are possible.  Refer to [IEEE830-1998] for further elaboration of these explanations, as well as other options for SRS organization.]

### 1.1 Purpose
This document specifies the requirements for cooken. Cooken is a for users to find recipes they can cook with limited ingredients. Here will be specified use cases, functional requirements, reliability, and technologies used.

### 1.2 Scope
This SRS applies to the cooken application. 

In cooken there is only one actor, the user/cook. The user has access to all frontend features of the application.

There are two subsystems:
- Default not logged in mode: The user can use the recipe search function but cannot save anything
- Personalized logged in mode: The user can save ingredients and recipes on the server

### 1.3 Definitions, Acronyms and Abbreviations

| Abbrevation | Explanation                            |
| ----------- | -------------------------------------- |
| SRS         | Software Requirements Specification    |
| n/a         | not applicable                         |
| tbd         | to be determined                       |
| TODO        | to be determined                       |
| ----------- | -------------------------------------- |

### 1.4 References

| Title                                         | Date       | Publishing organization   |
| --------------------------------------------- |:----------:| ------------------------- |
| [GitHub](https://github.com/kuscu0/cooken)    | 21.10.2020 | <Cooken Team>             |
| [UCD](use_case_diagram.png)                   | 21.10.2020 | <Cooken Team>             |
| [Blog](https://cooken264100434.wordpress.com/)| 21.10.2020 | <Cooken Team>             |
| --------------------------------------------- |:----------:| ------------------------- |


### 1.5 Overview
The next chapters describe the intended behavior and used tools/technologies.

## 2. Overall Description
[This section of the SRS should describe the general factors that affect the product and its requirements.  This section does not state specific requirements.  
Instead, it provides a background for those requirements, which are defined in detail in Section 3, and makes them easier to understand. Include such items as:
 - product perspective
 - product functions
 - user characteristics
 - constraints
 - assumptions and dependencies
 - requirements subsets]


### 2.1 Vision
Cooken helps users find recipes online that only require ingredients the user already has at home. These ingredients can be stored in a user account. In addition recipes can be saved or commented on.

### 2.2 Use Case Diagram
![Use case diagram](use_case_diagram.png)

### 2.3 Technology Stack
Frontend Web App:
- React

Backend Server:
- Node.js with Express
- MongoDB Database

## 3. Specific Requirements
[This section of the SRS should contain all the software requirements to a level of detail sufficient to enable designers to design a system to satisfy those requirements, 
and testers to test that the system satisfies those requirements.   When using use-case modeling, these requirements are captured in the Use-Cases and the applicable 
supplementary specifications.  If use-case modeling is not used, the outline for supplementary specifications may be inserted directly into this section, as shown below.]

### 3.1 Functionality
[This section describes the functional requirements of the system for those requirements which are expressed in the natural language style. For many applications, this may 
constitute the bulk of the SRS Package and thought should be given to the organization of this section. This section is typically organized by feature, but alternative 
organization methods may also be appropriate, for example, organization by user or organization by subsystem.  Functional requirements may include feature sets, capabilities, 
and security.
Where application development tools, such as requirements tools, modeling tools, etc., are employed to capture the functionality, this section document will refer to the 
availability of that data, indicating the location and name of the tool that is used to capture the data.]

#### 3.1.1 Login and registration
If the user wants to save data, an account is needed. For the registration a user name, E-Mail and password are needed. For logging in the E-Mail and password are used.

#### 3.1.2 Cooking Inventory
A list that can be edited by the user that holds all ingredients a user has. Each ingredient also has an optional expiration date.

If logged in, it is stored on the server.

#### 3.1.3 Ingredients list
This is a list of all possible ingredients that can appear in an recipe. The user uses this list to add ingredients to the cooking inventory.

#### 3.1.4 Recipe search
The main functions of cooken performs a search on a database of recipes. Recipes that use ingredients that are not in the cooking inventory will be filtered from the results. Optionally ingredients can be specified that have to appear in a recipe.

#### 3.1.5 Save links to recipes
Internal links to recipes can be stored in a user account as a way to quickly access favorite recipes.

Only available when logged in.

#### 3.1.6 Comment on recipe
The user can comment on recipes. These comment are user private.

Only available when logged in.

## 3.2 Usability

The frontend web app should feel intuitive and use to use. New users shouldn't need any or very little training time.

Most actions (searching for recipes, editing the cooking inventory, accessing saved recipes) should require less than 4 clicks.

Only text search should require keyboard use, all other actions should be possible with a mouse.

The web apps core features should work on mobile devices. Responsive design is optional.

## 3.3 Reliability
[Requirements for reliability of the system should be specified here. Some suggestions follow:
 - Availability—specify the percentage of time available ( xx.xx%), hours of use, maintenance access, degraded mode operations, etc.
 - Mean Time Between Failures (MTBF) — this is usually specified in hours, but it could also be specified in terms of days, months or years.
 - Mean Time To Repair (MTTR)—how long is the system allowed to be out of operation after it has failed?
 - Accuracy—specify precision (resolution) and accuracy (by some known standard) that is required in the system’s output.
 - Maximum Bugs or Defect Rate—usually expressed in terms of bugs per thousand of lines of code (bugs/KLOC) or bugs per function-point( bugs/function-point).
 - Bugs or Defect Rate—categorized in terms of minor, significant, and critical bugs: the requirement(s) must define what is meant by a “critical” bug; for example, complete 
   loss of data or a complete inability to use certain parts of the system’s functionality.]

### 3.3.1 Uptime
All features should have an annual uptime of at least 98.5 %. Meaning that the application can be down for up to 5.5 days a year.

### 3.3.2 MTTR
During German daytime the mean time to repair should be less than 6 hours. During nighttime repairs are not expected.

### 3.3.3 Bugs
The core functions (searching for recipes, managing the cooking inventory) must be bug free

### 3.3.4 Data loss
In case of a user data loss, users should be able to recreate their previous state with little effort.

## 3.4 Performance
[The system’s performance characteristics should be outlined in this section. Include specific response times. Where applicable, reference related Use Cases by name.
 - response time for a transaction (average, maximum)
 - throughput, for example, transactions per second
 - capacity, for example, the number of customers or transactions the system can accommodate
 - degradation modes (what is the acceptable mode of operation when the system has been degraded in some manner)
 - resource utilization, such as memory, disk, communications, etc.

### 3.4.1 Response time
The average response time of the server should be less than 50 ms. Intensive operations (recipe search) may take up to 5 s.

### 3.4.2 Total user capacity
The server should be able to store and handle at least 10,000 users.

### 3.4.3 Active user capacity
The server should be able to handle 10 % or 1,000 users actively using the application.

### 3.5 Supportability
We will use the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) as a coding standard.

Any libraries used must well accepted and maintained in order to guarantee support in the future. 

### 3.6 Design Constraints
[This section should indicate any design constraints on the system being built. Design constraints represent design decisions that have been mandated and must be adhered to.  
Examples include software languages, software process requirements, prescribed use of developmental tools, architectural and design constraints, purchased components, class 
libraries, etc.]

#### 3.6.1 Development Tools
- Git for version control
- JetBrains IntelliJ as an IDE
- YouTrack for project management

#### 3.6.2 Languages and Libraries
- React for the frontend
- Express.js for routing and handling HTTP requests
- MongoDB for databse storage

#### 3.6.3 Architecture
The MVC architecture should be used for the frontend.

### 3.7 Online User Documentation and Help System Requirements
The application must have a help page that includes a video explaining the features and UI of cooken. 

### 3.8 Purchased Components
n/a

### 3.9 Interfaces
[This section defines the interfaces that must be supported by the application. It should contain adequate specificity, protocols, ports and logical addresses, etc. so that the software 
can be developed and verified against the interface requirements.]

#### 3.9.1 User Interfaces

The application has the following pages/views:
- Login/Registration
- Cooking inventory: For adding and removing entries
- Search: Displays the result of a search query; has additional options to filter the results
- Saved recipes: Lists recipes saved by the user
- Recipe: Displays at least the ingredients, instructions and user comments

#### 3.9.2 Hardware Interfaces
n/a

#### 3.9.3 Software Interfaces
For communications the Express.js library implements a HTTP REST API

MongoDB is used to interact with a NoSQL database.

#### 3.9.4 Communications Interfaces
Communications in an production environment will run over https with an SSL certificate to ensure safe transfer of user data.

Information is in the JSON format.

### 3.10 Licensing Requirements
All tools & libraries must be free for commercial use

### 3.11 Legal, Copyright, and Other Notices
GPL-3.0

#### Summary

Permissions:
- Commercial use
- Modification
- Distribution
- Patent use
- Private use

Limitations:
- Liability
- Warranty

Conditions:
- License and copyright notice
- State changes
- Disclose source
- Same license

[See](LICENSE)

### 3.12 Applicable Standards
n/a

## 4. Supporting Information
n/a
