# Table of Contents

1. Introduction
2. Use Case

<a name='Introduction'></a>
# Introduction
In this project, I will design a three-tier architecture web application for Circle Wash laundromat to increase customer loyalty, internal business productivity, and the operation's credibility. First, based on online reviews, customers have trouble filing complaints after business hours and experience difficulty getting a refund for machine malfunction. The website will provide fair online customer service handling customers' complaints. Increase internal business productivity; the website would offer scheduling services for picking up and dropping off laundries, eliminating staff picking up calls, and manually scheduling each laundry delivery. In addition, the scheduling service would provide an optimal delivery route for the driver to increase productivity. Lastly, the operation's policies and information are currently present to customers in posters scattered around the laundromat. A website can unify the details and communicate information clearly to the customers.

<a name='Use-Case'></a>
# Use Case
This website contains two main systems: Customer Service, Scheduling & Delivery System. Each system has a targeted use case demonstrated below. 

<a name='Customer-Service'></a>
## Customer Service
1. Entry point:
    - Laundromat customer who encountered machine malfunction after business hour where there’s no staff for assistance
    - Laundromat customers who encountered machine malfunction that requires verification on the machine history
2. Handle complaint:
    - Users with smartphone and Internet access may file a complaint through a QR code or web link (displayed in-store). 
    - Users without a smartphone or Internet access may file a complaint through a paper complaint form (located around the main office).
3. Enter Online Complaint Form:
    - Users with an existing account would be asked to log in before filing a report.
    - The user without a laundromat account would be provided with two options:
        - Option 1: Create an account then file a complaint
        - Option 2: file a complaint as a guess
4. Filing Online Complaint Form:
    - The user would need to provide machine number, machine type, amount of money request for return, payment type on the machine, details on the type of payment(FasCard number or Credit card last 4 digits), preferred refund option (cash or in-store credit)  and describe the problem.
        - Users with an existing account would have their contact info prefilled
        - A user without an account would need to manually enter their contact info
    - The web app would record the data user-provided, and the user’s location, the user submits time by default.
5. Administrative Portal:
    - There are two types of accounts: owner (have power on processing complaints and refund), staff (power on processing complaints only)
    - Each action performed by who in the administrative portal would be recorded into the database
6. Review:
    - When a complaint is filed, laundromat staff who have access to the administrative portal would receive an email notification on the name of the complaints, and the total number of unreviewed complaints.
    - On the administrative portal, a real-time notification pop-up would be sent to the administrative all-opened dashboard page, and the new complaint would be displayed in real-time in the complaint list. (using WebSocket connect between dashboard and backend server)
    - On the complaint page, the owner and staff have access to the information on the complaints and machine history regarding the complaint.
7. Approval Process: 
    - Once the staff or owner reviews the complaint by comparing the complaint detail with the machine history, they can approve the complaint.
        - If the complaint does not require a refund an email will be sent to the customer for an update
        - If a staff approve a complaint that requires a refund
            - An email notification would be sent to the owner, letting him know the complaint name and the total number of refund requests.
        - If the owner approves a complaint that requires a refund, the app would redirect him to the refund page.
8. Deny Process:
    - Once the staff or owner reviews the complaint and found no fault.
        - An email would be sent to the customer providing evidence.
9. Could not Identify Complaint:
    - Once the staff or owner reviews the complaint and cannot approve or deny the complaint
        - If a customer provides incorrect information
            - staff can request more information from the customer through an email.
        - If the machine failed to record machine data
            - An email would be sent to the owner updating him on the situation.
            - The owner can manually check the camera 
                - Then redirect the complaint to the approval process, deny process, or request more info process.
10. Refund Process:
    - Once the refund is approved, the owner can approve the refund on the refund page.
    - The owner can refund the customer by their preferred refund method mentioned in the report form. 
        - Cash: an email would be sent to the customer updating him on the situation and acknowledging him that he can pick up his refund in the laundromat during business hour
        - In-Store Credit (AKA FasCard credit):
            - If they user-provided their Fascard number, the owner can add value to their fascard, and update them with an email.
            - If the user does not have a fascard, the owner can refund them instore credit with a new fascard with the value of (refund value minus fascard card value($ 1)). In addition, an email would be sent to acknowledge the customer that his complaint is approved and he can pick up his fascard in the laundromat during business hours. 
11. Possible Outcome: 
    - There are six possible outcomes in this use case and it’s all highlighted in the section above.
    - The six possible outcomes (described in mathematical operations):
        - Complaint approved + no refund = apology email
        - Complaint approved + cash refund = apology email + cash refund
        - Complaint approved + existing FasCard refund = apology email + FasCard credit
        - Complaint approved + new fascard refund = apology email + fascard Card + fascard credit
        - Complaint denied = apology email + evidence
        - The complaint can’t be approved or denied = apology email + requesting more info






