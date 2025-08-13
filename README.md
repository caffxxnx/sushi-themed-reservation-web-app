## Setup

**First, install npm packages**
```bash
npm i
```

**Next, to start server in different modes.**
You can run either:
```bash
npm run dev
OR
npm run start
```

**To build the project**
```bash
npm run build
```

**If you want to deploy on Vercel:**
Create a `.env` file with code below:
```bash
NODE_ENV=production
DB_PATH=../../tmp/db.json
```
And then please run:
```bash
npm i -g vercel // Install vercel cli (if needed)
npm run deploy // This will go through: login vercel > build > deploy to vercel
```

## Tech Stack Used

- chakra-ui
- lodash
- moment
- next
- react-hook-form
- swr
- uuid
- zod

## Design Decisions and Structure Overview

During the design phase, I first analyzed the parameters required for a store’s reservation policy, including:
- Opening and closing hours  
- Reservation slot interval (e.g., every 15 minutes)  
- Maximum number of reservations allowed per slot  

Since requirements vary between stores, these parameters are abstracted into a `ReservationPolicyConfig` configuration object and stored in the database.  
A future admin interface will allow store owners to dynamically update these parameters, enabling flexibility across different use cases.

For the order data design, each order includes:
- **Basic information**: reservation date and time (`reservationDateTime`), customer name, phone number  
- **System information**: unique identifier (`reservationID`), creation timestamp (`createDateTime`), update timestamp (`updateDateTime`)  

To avoid the predictability and exposure risks of auto-increment IDs, **UUID v4** is used as the `reservationID`.  
UUID v4 is randomly generated, ensuring strong unpredictability, and is paired with the `createDateTime` field to precisely record creation time for efficient queries and analytics.  
Additionally, an index on `reservationDateTime` is implemented at the database level to improve query performance and support efficient statistical reporting.

---

### API Design Approach
The API design process was approached from a **UI-first perspective**, ensuring the data flow aligns naturally with user interactions.

1. **Available Date & Time Retrieval**  
  - `GET /getAvailableTimeByDate?date={yyyy-MM-dd}&id={reservationID}`  
    - Returns a list of available reservation times for the specified date.  
    - **Parameter details**:  
      - `date`: The target date for which to retrieve available times.  
      - `id` (optional): When editing an existing reservation, passing its `reservationID` allows the system to exclude that reservation from conflict checks, preventing false positives.
    - **Note**:  
      - The returned available times are calculated based on parameters defined in the `ReservationPolicyConfig` configuration file, including business hours (`SERVICE_START_TIME`, `SERVICE_END_TIME`), reservation intervals (`INTERVAL_MINUTES`), and the maximum number of reservations allowed per interval (`NUM_PER_INTERVAL`).  
      - These settings ensure the returned time slots comply with the store’s operating and reservation policies.  
    - Rationale: Users must select a date before choosing a time, so the system provides available times based on that date.  
   - `GET /getAvailableDate`  
     - Returns a list of available reservation dates, up to the maximum limit defined in `ReservationPolicyConfig`.

2. **Reservation Management**  
  - `GET /reservations/{reservationID}` → Retrieve a reservation  
  - `POST /reservations` → Create a new reservation  
  - `PUT /reservations/{reservationID}` → Update an existing reservation  
  - `DELETE /reservations/{reservationID}` → Cancel a reservation  

This API structure ensures the UI workflow remains clear, with the retrieval sequence matching the user’s selection process, thereby minimizing extra front-end logic.

### Data Structure
#### RESERVATION_POLICY_CONFIG
|Name|RESERVATION_AVAILABLE_DAYS|SERVICE_START_TIME|SERVICE_END_TIME|INTERVAL_MINUTES|NUM_PER_INTERVAL|
|:---|:---|:---|:---|:---|:---|
|Type|Int|String|String|Int|Int|
|Description|Available days from tomorrow|When could reservation be made|When the last reservation could be made|How long between two reservations in minute|How many reservations could be made per interval|
|Example|30|'10:00'|'21:00'|15|5|

#### RESERVATION_TABLE
|Name|reservationID|reservationDateTime|Name|Phone|Number|createDateTime|updateDateTime|
|:---|:---|:---|:---|:---|:---|:---|:---|
|Type|String|String|String|Int|Int|Int|Int|
|Description|Reservation id (uuid)|Reservation time (timestamp)|Name for who made the reservation|Phone for who made the reservation|Reservation number on the reservation interval|Reservation created time|Reservation updated time|
|Example|47fb4229-6445-4321-8bfc-39e90c336a42|1754960400000|Yamada|07012341234|1|1754960400000|1754960400000|

## Production Link (Vercel)
https://sushi-themed-reservation-web-app.vercel.app/
