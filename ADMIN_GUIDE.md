# Tesfa Travels - Admin Dashboard

## Overview

The admin dashboard provides comprehensive internal operations management for Tesfa Travel & Tour. All features are accessible at `/admin` with a professional, intuitive interface designed for non-technical staff.

---

## Dashboard Access

**URL**: production domain `/admin`

### Features by Page

---

## 1. Admin Home Dashboard (`/admin`)

**Purpose**: Overview of all business metrics and operations at a glance

### Key Metrics
- **Total Bookings**: Real-time count of all bookings with growth percentage
- **Active Visa Applications**: Current visa applications in pipeline with trend
- **Total Customers**: All registered customers with growth tracking
- **Monthly Revenue**: Total revenue for the current period with trend

### Quick Actions
Four card buttons for quick navigation:
- **Manage Bookings** - Access customer database and ticket management
- **Visa Pipeline** - View and manage visa applications on Kanban board
- **Marketing** - Create and manage promotions and campaigns
- **Analytics** - View detailed reports and performance metrics

### Recent Activity Widgets
- **Recent Bookings**: Last 4 bookings with customer, destination, amount, and status
- **Urgent Inquiries**: Last 3 customer inquiries requiring attention with timestamps

---

## 2. Bookings & CRM (`/admin/bookings`)

**Purpose**: Manage all customer data, tickets, and inquiries in one centralized hub

### Tab 1: Customer Database

**Features**:
- View all customers with complete contact information
- Search by name or email
- Filter by customer status (All, Active, VIP, New)
- View customer details:
  - Contact info (email, phone)
  - Number of bookings made
  - Total amount spent
  - Customer status (Active, VIP, New)

**Actions Available**:
- Add new customer manually
- Edit customer information
- View customer travel history
- Mark customers as VIP for special offers

### Tab 2: Ticket Tracker

**Features**:
- View all issued airline tickets
- Track booking status (Confirmed, Pending, Cancelled)
- Monitor payment status (Paid, Pending)
- See upcoming departures

**Ticket Information Displayed**:
- Ticket ID (TKT-XXX format)
- Customer name
- Route (e.g., NBO → ADD)
- Departure date
- Airline name
- Booking status
- Payment status

**Actions Available**:
- Issue refunds
- Rebook passengers
- Modify flight details
- Cancel bookings

### Tab 3: Inquiry Inbox

**Features**:
- Unified hub for all customer inquiries
- Includes website form submissions, WhatsApp messages, and email inquiries
- Mark inquiries as read/resolved
- Assign inquiries to team members

**Inquiry Information**:
- Customer name and email
- Subject/query
- Date/time received
- Read status (visual indicator)

---

## 3. Visa Pipeline (`/admin/visa`)

**Purpose**: Visual management of visa applications through processing stages using Kanban board

### Pipeline Stages
Applications move through 6 stages:

1. **Document Review** - Initial stage after submission
2. **Submitted** - Formal submission to embassy
3. **Processing** - In progress at embassy
4. **Ready for Pickup** - Visa approved, awaiting collection
5. **Approved** - Final stage, visa issued
6. **Rejected** - Application denied

### Kanban Board Features

**Each Application Card Shows**:
- Applicant name
- Destination country
- Submission date
- Current stage

**Card Actions**:
- **Drag & Drop** applications between stages (coming soon with full drag-drop)
- **Stage Selector Dropdown** - Click dropdown to move to any stage
- **Quick Move Button** - Plus icon moves to next stage
- **Add Notes** - Link to add internal notes and comments
- **Delete** - Remove application from pipeline

### Statistics Section
Below the Kanban board:
- **Total Applications** - All applications in pipeline
- **Approved This Month** - Count of approved visas
- **Pending Review** - Applications in Document Review + Processing stages

---

## 4. Marketing & CMS (`/admin/marketing`)

**Purpose**: Manage promotional deals, pop-up alerts, and marketing campaigns

### Tab 1: Deal Manager

**Current Promotions** (examples):
- "Nairobi to Addis Special" - $300
- "Dubai Flash Sale" - From $450
- "Ethiopian Highlands Tour" - From $1,200

**Deal Information Displayed**:
- Deal title and featured price
- Start and end dates
- Current status (Active/Inactive)
- Number of views

**Actions**:
- **New Deal** button to create promotion
- **Edit** - Modify promotion details
- **Delete** - Remove promotion

**How to Create a Deal**:
1. Click "New Deal" button
2. Enter promotion title and price
3. Set start and end dates
4. Upload promotional image
5. Set visibility (homepage, flights page, etc.)
6. Save and publish

### Tab 2: Pop-up Alerts

**Current Pop-ups** (examples):
- "Limited Time: 40% Off Addis Routes" - Active on Homepage and Flights page
- "Corporate Bulk Booking Discount" - Scheduled for Corporate Page

**Pop-up Information**:
- Alert title
- Pages where it displays
- Schedule (start/end dates)
- Live/Scheduled status

**Actions**:
- **New Pop-up** button to create alert
- **Eye/Eye-off** - Toggle visibility
- **Edit** - Modify content and schedule

**How to Create a Pop-up**:
1. Click "New Pop-up" button
2. Write compelling offer text
3. Select which pages to display on
4. Set display start and end dates
5. Schedule or publish immediately

### Tab 3: SMS & Email Campaigns

**Campaign Types**:
- **Email**: Newsletter and bulk email campaigns
- **SMS**: Text message alerts and promotions

**Campaign Information**:
- Campaign type (SMS/Email)
- Subject line
- Number of recipients
- Status (Sent/Draft)
- Open rate (for sent campaigns)
- Click rate (for sent campaigns)

**Current Campaigns**:
- May Flash Sales Email - 28% open rate, 12% click rate
- Nairobi-Addis SMS Deal - 45% open rate, 18% click rate
- Corporate Program Email - Draft status

**Actions**:
- **New Campaign** button
- **Edit** - Modify campaign content
- **Send** - Launch draft campaign
- **Analytics** - View performance metrics

**How to Create a Campaign**:
1. Click "New Campaign" button
2. Choose SMS or Email
3. Write subject/message
4. Select customer segments (Individual/Corporate)
5. Schedule send time
6. Preview and save as draft or send immediately

---

## 5. Analytics & Financial Reports (`/admin/analytics`)

**Purpose**: Monitor business performance with detailed metrics and insights

### Time Period Filter
Select data range at top right:
- Last 7 Days
- Last 30 Days (default)
- Last 3 Months
- Last 12 Months

### Key Performance Metrics

**Displayed KPIs**:
- **Total Revenue** - Sum of all bookings (e.g., $124,560)
- **Total Bookings** - Number of completed bookings (e.g., 487)
- **New Customers** - New registrations in period (e.g., 156)
- **Avg Booking Value** - Average order size (e.g., $255)

Each metric shows:
- Current value
- Change percentage (+ or -)
- Trend indicator (up/down)

### Revenue by Airline

**Breakdown showing**:
- Airline name (Qatar Airways, Kenya Airways, Emirates, Ethiopian, Others)
- Total revenue from each airline
- Number of bookings
- Percentage of total revenue
- Visual bar chart

**Use Case**: Identify top-performing airline partnerships and negotiate better rates

### Top Destinations This Month

**Table showing**:
- Destination city
- Number of bookings
- Total revenue
- Growth trend (% change)

**Top 5 Example**:
1. Addis Ababa - 124 bookings, $18,600
2. Dubai - 98 bookings, $22,100
3. London - 76 bookings, $24,800
4. Johannesburg - 65 bookings, $15,850
5. Istanbul - 48 bookings, $14,400

**Use Case**: Plan marketing campaigns for high-demand routes and allocate resources

### Conversion Rate by Channel

**Marketing Channel Performance**:
- **Direct Website** - 234 conversions, 12.4% rate, $18 per customer
- **Instagram Ads** - 156 conversions, 8.6% rate, $22 per customer
- **Facebook Ads** - 142 conversions, 7.8% rate, $19 per customer
- **Email Newsletter** - 98 conversions, 18.2% rate, $12 per customer
- **WhatsApp Referral** - 112 conversions, 15.4% rate, $14 per customer

**Metrics Explained**:
- **Conversions**: Number of bookings from this channel
- **Conv. Rate**: Percentage of visitors who converted to bookings
- **Acq. Cost**: Average cost to acquire one customer via this channel

**Use Case**: Optimize marketing spend by investing more in high-performing, low-cost channels

### Insights & Recommendations

**Automated Insights**:
- Growth highlights (what's working well)
- Opportunity alerts (areas needing improvement)
- Actionable recommendations based on data

---

## Navigation & Interface

### Sidebar Navigation
- **Collapsible** - Click menu icon to minimize/expand
- **Color-coded** - Icons and labels for quick identification
- **Mobile-friendly** - Adapts for tablet and phone screens

### Responsive Design
- Desktop: Full sidebar + main content
- Tablet: Collapsible sidebar + wider content
- Mobile: Bottom navigation menu (coming soon)

### Dark Mode
- Toggle dark/light theme in browser preferences
- All admin pages support both themes

---

## Best Practices

### Bookings Management
1. Check "Urgent Inquiries" daily for customer requests
2. Follow up on pending payments within 24 hours
3. Mark VIP customers for priority service
4. Maintain accurate customer contact information

### Visa Pipeline
1. Update visa status immediately upon embassy communication
2. Add notes for any special requirements or delays
3. Notify customers when status changes
4. Monitor "Ready for Pickup" stage to inform applicants

### Marketing Campaigns
1. Launch promotions during high-traffic days (Thursdays-Sundays)
2. Set realistic promotional periods (at least 2 weeks)
3. A/B test different pop-up messages
4. Review campaign performance weekly
5. Use email for high-conversion customers, SMS for quick alerts

### Analytics
1. Review metrics weekly to identify trends
2. Compare month-over-month growth
3. Adjust marketing spend based on channel performance
4. Monitor acquisition cost to ensure profitability
5. Use insights to inform strategic decisions

---

## Support & Troubleshooting

### Common Tasks

**Adding a New Booking**:
1. Go to Bookings & CRM > Customers
2. Click "Add Customer"
3. Fill in contact details
4. Save and send booking link via email

**Tracking a Visa Application**:
1. Go to Visa Pipeline
2. Find applicant in Kanban board
3. Click card to see full details
4. Update stage as process progresses

**Creating a Flash Sale**:
1. Go to Marketing > Deal Manager
2. Click "New Deal"
3. Enter promotion details and dates
4. Publish

**Viewing Monthly Revenue**:
1. Go to Analytics
2. Ensure "Last 30 Days" is selected
3. View "Total Revenue" metric at top
4. Scroll to "Revenue by Airline" for breakdown

---

## Data Privacy & Security

- All customer data is encrypted and secure
- Never share customer passwords or sensitive information
- Log out when leaving the admin area
- Report any suspicious activity immediately

---

## Contact Support

For admin system issues or questions:
- Email: support@tesfatraveltour.com
- Phone: +254 713 303 030
- WhatsApp: Available 24/7
