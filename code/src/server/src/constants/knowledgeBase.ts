export const defaultKnowledgeBase = {
    Adjustment: {
      sub_request_types: [
        "AU Transfer",
        "Closing Notice",
        "Reallocation Fees",
        "Amendment Fees",
        "Reallocation Principal",
      ],
      description: "Requests related to adjustments to loan accounts",
      keywords: ["adjust", "transfer", "reallocate", "amend", "close"],
    },
    "AU Transfer": {
      sub_request_types: [],
      description: "Requests related to account unit transfers",
      keywords: ["transfer", "AU", "account movement"],
    },
    "Closing Notice": {
      sub_request_types: [
        "Reallocation Fees",
        "Amendment Fees",
        "Reallocation Principal",
      ],
      description: "Requests for loan closing notices",
      keywords: ["closing", "notice", "finalize"],
    },
    "Commitment Change": {
      sub_request_types: ["Cashless Roll", "Decrease", "Increase"],
      description: "Requests to modify loan commitment amounts",
      keywords: ["commitment", "increase", "decrease", "roll", "change"],
    },
    "Fee Payment": {
      sub_request_types: ["Ongoing Fee", "Letter of Credit Fee"],
      description: "Requests related to fee payments",
      keywords: ["fee", "payment", "charge", "credit fee"],
    },
    "Money Movement - Inbound": {
      sub_request_types: [
        "Principal",
        "Interest",
        "Principal + Interest",
        "Principal + Interest + Fees",
      ],
      description: "Requests for incoming fund transfers",
      keywords: ["deposit", "transfer in", "funding", "inbound", "payment"],
    },
    "Money Movement - Outbound": {
      sub_request_types: ["Timebound", "Foreign Currency"],
      description: "Requests for outgoing fund transfers",
      keywords: ["withdraw", "transfer out", "outbound", "payment out"],
    },
    "Payment Processing": {
      sub_request_types: ["Payment Posting", "Payment Reversal"],
      description: "Requests related to processing loan payments",
      keywords: ["payment", "processing", "reversal", "posting"],
    },
    "Escrow Management": {
      sub_request_types: ["Tax Payment", "Insurance Payment", "Escrow Analysis"],
      description: "Requests related to escrow account management",
      keywords: ["escrow", "tax", "insurance", "analysis"],
    },
    "Loan Modification": {
      sub_request_types: [
        "Interest Rate Adjustment",
        "Term Extension",
        "Principal Forbearance",
      ],
      description: "Requests for loan modifications",
      keywords: ["loan", "modification", "rate", "extension", "forbearance"],
    },
    "Default Management": {
      sub_request_types: ["Collections", "Loss Mitigation", "Foreclosure"],
      description: "Requests related to managing defaulted loans",
      keywords: ["default", "collections", "foreclosure", "mitigation"],
    },
    "Customer Service": {
      sub_request_types: [
        "Account Inquiry",
        "Statement Request",
        "Complaint Resolution",
      ],
      description: "General customer service requests",
      keywords: ["customer", "service", "inquiry", "statement", "complaint"],
    },
    "Investor Reporting": {
      sub_request_types: ["Remittance Reporting", "Delinquency Reporting"],
      description: "Requests related to investor reporting",
      keywords: ["investor", "reporting", "remittance", "delinquency"],
    },
  };