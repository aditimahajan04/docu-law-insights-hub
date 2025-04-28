
import { Document, DocumentDetail, DocumentStatus, FlawType, User } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Demo User",
    email: "demo@legalease.com",
    token: "mock-jwt-token",
  }
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: "doc1",
    title: "Employment Contract",
    originalFilename: "employment_contract_2023.pdf",
    uploadDate: "2023-04-15T10:30:00Z",
    status: DocumentStatus.REVIEWED,
    userId: "u1",
  },
  {
    id: "doc2",
    title: "Non-Disclosure Agreement",
    originalFilename: "nda_acme_corp.pdf",
    uploadDate: "2023-05-20T14:45:00Z",
    status: DocumentStatus.SIMPLIFIED,
    userId: "u1",
  },
  {
    id: "doc3",
    title: "Lease Agreement",
    originalFilename: "commercial_lease_2023.pdf",
    uploadDate: "2023-06-10T09:15:00Z",
    status: DocumentStatus.PARSED,
    userId: "u1",
  }
];

// Mock document details
export const mockDocumentDetails: Record<string, DocumentDetail> = {
  "doc1": {
    id: "doc1",
    title: "Employment Contract",
    originalFilename: "employment_contract_2023.pdf",
    uploadDate: "2023-04-15T10:30:00Z",
    status: DocumentStatus.REVIEWED,
    userId: "u1",
    originalText: `EMPLOYMENT AGREEMENT

THIS EMPLOYMENT AGREEMENT (the "Agreement") is made and entered into as of January 15, 2023 (the "Effective Date"), by and between ACME Corporation, a Delaware corporation with its principal place of business at 123 Main Street, Anytown, USA ("Employer"), and Jane Smith, an individual residing at 456 Oak Lane, Somewhere, USA ("Employee").

WHEREAS, Employer desires to employ Employee on the terms and conditions set forth herein; and
WHEREAS, Employee desires to be employed by Employer on such terms and conditions.

NOW, THEREFORE, in consideration of the mutual covenants, promises, and agreements set forth herein, the parties agree as follows:

1. EMPLOYMENT AND DUTIES

1.1 Position. Employer hereby employs Employee as Senior Software Developer, and Employee hereby accepts such employment, on the terms and conditions set forth herein.

1.2 Duties. Employee shall perform all duties and responsibilities inherent in the position of Senior Software Developer, including any duties as may be assigned by Employee's supervisor. Employee shall report directly to the Chief Technology Officer.

2. TERM OF EMPLOYMENT

2.1 At-Will Employment. Employee's employment under this Agreement shall be at-will, commencing on the Effective Date and continuing until terminated pursuant to Section 5 of this Agreement (the "Employment Period").

3. COMPENSATION

3.1 Base Salary. During the Employment Period, Employer shall pay Employee a base salary of $120,000 per year, payable in installments according to Employer's regular payroll schedule.

3.2 Annual Bonus. Employee shall be eligible for an annual performance bonus of up to 20% of Base Salary, based on criteria established by Employer's management.

4. BENEFITS

4.1 Standard Benefits. Employee shall be eligible to participate in Employer's benefit plans on the same terms and conditions as other employees of similar status.

4.2 Vacation. Employee shall be entitled to three (3) weeks of paid vacation annually.

5. TERMINATION OF EMPLOYMENT

5.1 Termination. This Agreement and Employee's employment may be terminated as follows:

(a) By Employer for Cause (as defined below) effective immediately;
(b) By Employee with thirty (30) days' written notice to Employer;
(c) By Employer without Cause, with thirty (30) days' written notice to Employee;
(d) Upon Employee's death or permanent disability.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

EMPLOYER: ACME Corporation

By: ______________________
Name: John Johnson
Title: Chief Executive Officer

EMPLOYEE:

________________________
Jane Smith`,
    simplifiedText: `EMPLOYMENT AGREEMENT

This is a job contract between ACME Corporation (the Employer) and Jane Smith (the Employee) starting January 15, 2023.

Key Points:
- Jane will work as a Senior Software Developer
- She will report to the Chief Technology Officer
- This is an "at-will" employment (either party can end it)

Pay and Benefits:
- Salary: $120,000 per year
- Possible yearly bonus: up to 20% of salary based on performance
- Standard company benefits
- 3 weeks of paid vacation each year

How the Employment Can End:
1. The company can fire Jane immediately if there's a good reason
2. Jane can quit by giving 30 days' notice
3. The company can let Jane go with 30 days' notice even without cause
4. The employment ends if Jane dies or becomes permanently disabled

Both parties have signed to show they agree.`,
    flaws: [
      {
        id: "flaw1",
        type: FlawType.MISSING_CLAUSE,
        description: "The agreement is missing a confidentiality clause protecting company information.",
        location: { startIndex: 0, endIndex: 0 },
        suggestion: "Add a section titled 'CONFIDENTIALITY' that prohibits disclosure of proprietary information during and after employment."
      },
      {
        id: "flaw2",
        type: FlawType.AMBIGUITY,
        description: "The term 'Cause' is referenced in section 5.1(a) but never defined in the agreement.",
        location: { startIndex: 1500, endIndex: 1520 },
        suggestion: "Add a definition for 'Cause' that specifies grounds for immediate termination, such as misconduct, illegal activity, breach of agreement, etc."
      }
    ],
    caseStudies: [
      {
        id: "case1",
        title: "Smith v. Acme Tech Industries",
        citation: "123 F.3d 456 (9th Cir. 2022)",
        summary: "The court held that undefined terms like 'Cause' in employment agreements render termination clauses potentially unenforceable. Employers must clearly define grounds for termination.",
        relevanceScore: 0.92
      },
      {
        id: "case2",
        title: "Johnson v. Enterprise Solutions",
        citation: "567 Cal.App.4th 890 (2021)",
        summary: "An employment agreement without confidentiality provisions failed to protect the employer when an employee shared proprietary information after departure.",
        relevanceScore: 0.85
      }
    ]
  },
  "doc2": {
    id: "doc2",
    title: "Non-Disclosure Agreement",
    originalFilename: "nda_acme_corp.pdf",
    uploadDate: "2023-05-20T14:45:00Z",
    status: DocumentStatus.SIMPLIFIED,
    userId: "u1",
    originalText: `MUTUAL NON-DISCLOSURE AGREEMENT

THIS MUTUAL NON-DISCLOSURE AGREEMENT (this "Agreement") is made and entered into as of June 1, 2023 (the "Effective Date") by and between ACME Corporation, a Delaware corporation having its principal place of business at 123 Main Street, Anytown, USA ("ACME"), and XYZ Innovations Inc., a California corporation having its principal place of business at 789 Tech Boulevard, Silicon Valley, CA ("XYZ"). ACME and XYZ may be referred to herein individually as a "Party" and collectively as the "Parties."

WHEREAS, the Parties wish to explore a potential business relationship relating to collaborative software development (the "Purpose");

WHEREAS, in connection with the Purpose, each Party may disclose to the other certain confidential and proprietary information, and the Parties wish to protect such information in accordance with this Agreement;

NOW, THEREFORE, in consideration of the foregoing and the mutual covenants contained herein, the Parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by one Party (the "Disclosing Party") to the other Party (the "Receiving Party"), either directly or indirectly, in writing, orally or by inspection of tangible objects, which is designated as "Confidential," "Proprietary" or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information includes, but is not limited to, technical data, trade secrets, know-how, research, product plans, products, services, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, financial or other business information.

2. NON-USE AND NON-DISCLOSURE
The Receiving Party agrees not to use any Confidential Information of the Disclosing Party for any purpose except to evaluate and engage in discussions concerning the Purpose. The Receiving Party agrees not to disclose any Confidential Information of the Disclosing Party to third parties or to the Receiving Party's employees, except to those employees who are required to have the information in order to evaluate or engage in discussions concerning the Purpose and who have signed confidentiality agreements with the Receiving Party.

3. MAINTENANCE OF CONFIDENTIALITY
The Receiving Party shall take reasonable measures to protect the secrecy of and avoid disclosure and unauthorized use of the Confidential Information of the Disclosing Party. The Receiving Party shall notify the Disclosing Party immediately in the event of any unauthorized use or disclosure of the Disclosing Party's Confidential Information.

4. NO OBLIGATION
Nothing herein shall obligate either Party to proceed with the Purpose or any transaction between them.

5. NO WARRANTY
ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS". NEITHER PARTY MAKES ANY WARRANTIES, EXPRESS, IMPLIED OR OTHERWISE, REGARDING ITS ACCURACY, COMPLETENESS OR PERFORMANCE.

6. TERM
This Agreement shall remain in effect for a period of two (2) years from the Effective Date, unless earlier terminated by either Party with thirty (30) days prior written notice to the other Party. The Receiving Party's obligations under this Agreement shall survive any such termination or expiration for a period of five (5) years thereafter.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

ACME CORPORATION                    XYZ INNOVATIONS INC.

By: _________________________     By: _________________________
Name: John Johnson               Name: Sarah Williams
Title: Chief Executive Officer   Title: President`,
    simplifiedText: `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

This is an agreement between ACME Corporation and XYZ Innovations Inc., starting June 1, 2023.

Purpose:
Both companies want to explore working together on software development and need to protect the confidential information they'll share with each other.

Key Points:

1. What is considered confidential?
   - Any non-public information shared between the companies
   - This includes technical data, trade secrets, customer lists, product plans, etc.
   - Information can be marked as "Confidential" or should obviously be private

2. What you can't do with the other company's information:
   - Use it for any purpose except evaluating the potential partnership
   - Share it with anyone who doesn't need to know it
   - Only employees who need the information and have signed confidentiality agreements can see it

3. How to protect the information:
   - Take reasonable steps to keep it secret
   - Tell the other company immediately if there's any unauthorized disclosure

4. Other important details:
   - Neither company is required to enter into a business relationship
   - The confidential information is provided "as is" with no warranties
   - This agreement lasts for 2 years
   - The obligation to protect confidential information continues for 5 years after the agreement ends`,
    flaws: [
      {
        id: "flaw1",
        type: FlawType.NUMBERING_ERROR,
        description: "The numbering jumps from Section 6 directly to the signature block, but there should be a Section 7 for 'Return of Materials' to address the disposition of confidential documents.",
        location: { startIndex: 2800, endIndex: 2850 },
        suggestion: "Add a Section 7 titled 'RETURN OF MATERIALS' requiring all confidential information to be returned or destroyed upon request or termination of the agreement."
      },
      {
        id: "flaw2",
        type: FlawType.CONTRADICTORY,
        description: "Section 6 states the agreement lasts for 2 years but obligations survive for 5 years, creating potential confusion about the actual duration of confidentiality obligations.",
        location: { startIndex: 2600, endIndex: 2700 },
        suggestion: "Clarify that while the agreement term is 2 years, the confidentiality obligations specifically continue for 5 years after termination or expiration."
      }
    ],
    caseStudies: [
      {
        id: "case1",
        title: "TechCorp v. InnoSystems",
        citation: "987 F.Supp.2d 123 (S.D.N.Y. 2021)",
        summary: "The court ruled that an NDA lacking a 'Return of Materials' clause made it difficult to enforce the return of confidential documents after the business relationship ended.",
        relevanceScore: 0.88
      },
      {
        id: "case2",
        title: "DataSafe Inc. v. SecurityNow LLC",
        citation: "456 A.3d 789 (Del. Ch. 2022)",
        summary: "The court held that contradictory duration provisions in an NDA created ambiguity that was construed against the drafter, resulting in the shorter protection period being enforced.",
        relevanceScore: 0.94
      }
    ]
  },
  "doc3": {
    id: "doc3",
    title: "Lease Agreement",
    originalFilename: "commercial_lease_2023.pdf",
    uploadDate: "2023-06-10T09:15:00Z",
    status: DocumentStatus.PARSED,
    userId: "u1",
    originalText: `COMMERCIAL LEASE AGREEMENT

THIS LEASE AGREEMENT (this "Lease") is made and entered into as of July 1, 2023, by and between PROPERTY HOLDINGS LLC, a Delaware limited liability company ("Landlord"), and RETAIL VENTURES INC., a New York corporation ("Tenant").

WITNESSETH:

WHEREAS, Landlord is the owner of that certain building located at 555 Commerce Avenue, Metropolis, NY 10001 (the "Building"); and

WHEREAS, Tenant desires to lease from Landlord, and Landlord desires to lease to Tenant, certain premises in the Building, upon the terms and conditions hereinafter set forth;

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties hereby agree as follows:

1. PREMISES. Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, approximately 2,500 square feet of retail space located on the ground floor of the Building, as more particularly shown on Exhibit A attached hereto and incorporated herein by reference (the "Premises").

2. TERM. The term of this Lease shall be five (5) years (the "Initial Term"), commencing on August 1, 2023 (the "Commencement Date") and ending on July 31, 2028 (the "Expiration Date"), unless earlier terminated or extended in accordance with this Lease.

3. RENT.
3.1 Base Rent. Tenant shall pay to Landlord as base rent for the Premises the annual sum of One Hundred Twenty Thousand Dollars ($120,000.00), payable in equal monthly installments of Ten Thousand Dollars ($10,000.00) in advance on the first day of each month during the Term (the "Base Rent").

3.2 Additional Rent. In addition to the Base Rent, Tenant shall pay as additional rent Tenant's proportionate share of the Building's Operating Expenses as defined in Section 4 below ("Additional Rent").

4. OPERATING EXPENSES. Tenant shall pay to Landlord, as Additional Rent, Tenant's proportionate share of all costs and expenses incurred by Landlord in connection with the ownership, operation, maintenance and repair of the Building and the land upon which the Building is situated (collectively, the "Operating Expenses").

5. SECURITY DEPOSIT. Upon execution of this Lease, Tenant shall deposit with Landlord the sum of Twenty Thousand Dollars ($20,000.00) as security for Tenant's faithful performance of Tenant's obligations hereunder (the "Security Deposit").

19. NOTICES. All notices required or permitted under this Lease shall be in writing and shall be delivered (i) in person, (ii) by certified mail, return receipt requested, postage prepaid, or (iii) by a commercial overnight courier that guarantees next day delivery and provides a receipt.

20. MISCELLANEOUS. This Lease contains the entire agreement between the parties and may not be modified except by an instrument in writing executed by the parties hereto. This Lease shall be governed by and construed in accordance with the laws of the State of New York.

IN WITNESS WHEREOF, the parties hereto have executed this Lease as of the day and year first above written.

LANDLORD:                             TENANT:
PROPERTY HOLDINGS LLC                 RETAIL VENTURES INC.

By: _________________________        By: _________________________
Name: Robert Johnson                  Name: Lisa Chen
Title: Managing Member                Title: Chief Executive Officer`,
    simplifiedText: `COMMERCIAL LEASE AGREEMENT

Between: Property Holdings LLC (Landlord) and Retail Ventures Inc. (Tenant)
Property: 2,500 square feet retail space at 555 Commerce Avenue, Metropolis, NY

Key Terms:
- Lease Period: 5 years (August 1, 2023 to July 31, 2028)
- Monthly Rent: $10,000 ($120,000 per year)
- Additional Costs: Tenant pays a share of building operating expenses
- Security Deposit: $20,000

This is a legally binding contract for commercial retail space. The tenant will pay both the base rent and a portion of the building's operating expenses. The agreement starts August 1, 2023 and runs for 5 years unless ended early or extended.

All official notices must be delivered in person, by certified mail, or by overnight courier.

This document contains the complete agreement between the parties and is governed by New York state law.`,
    flaws: [
      {
        id: "flaw1",
        type: FlawType.NUMBERING_ERROR,
        description: "The lease jumps from Section 5 to Section 19, missing sections 6 through 18.",
        location: { startIndex: 1800, endIndex: 2000 },
        suggestion: "Add the missing sections 6-18 which typically cover: Use of Premises, Maintenance & Repairs, Utilities, Insurance, Default, Assignment & Subletting, etc."
      },
      {
        id: "flaw2",
        type: FlawType.MISSING_CLAUSE,
        description: "The lease lacks a force majeure clause addressing unforeseeable circumstances preventing performance.",
        location: { startIndex: 0, endIndex: 0 },
        suggestion: "Add a force majeure clause specifying how rent and other obligations would be affected during events outside the parties' control (natural disasters, pandemics, etc.)."
      },
      {
        id: "flaw3",
        type: FlawType.AMBIGUITY,
        description: "Section 4 refers to 'Tenant's proportionate share' of Operating Expenses but never defines how this share is calculated.",
        location: { startIndex: 1500, endIndex: 1600 },
        suggestion: "Specify that Tenant's proportionate share means the percentage obtained by dividing the rentable square footage of the Premises by the total rentable square footage of the Building."
      }
    ],
    caseStudies: [
      {
        id: "case1",
        title: "Metro Retail v. Citywide Properties",
        citation: "234 N.Y.S.3d 567 (N.Y. Sup. Ct. 2021)",
        summary: "The court found that missing sections in a commercial lease created ambiguity about tenant obligations, leading to unenforceable provisions for additional services and charges.",
        relevanceScore: 0.97
      },
      {
        id: "case2",
        title: "Retailer's Association v. Landmark Buildings",
        citation: "345 F.Supp.3d 678 (S.D.N.Y. 2020)",
        summary: "During COVID-19 shutdowns, tenants without force majeure clauses generally remained obligated to pay rent despite inability to operate, unlike tenants with such provisions.",
        relevanceScore: 0.89
      },
      {
        id: "case3",
        title: "Premium Spaces Inc. v. Downtown Holdings",
        citation: "567 N.Y.S.3d 890 (N.Y. App. Div. 2022)",
        summary: "A commercial lease with an undefined 'proportionate share' term was interpreted by the court to mean the ratio of leased space to total rentable building area, which resulted in a higher charge than the tenant expected.",
        relevanceScore: 0.86
      }
    ]
  }
};

// Mock APIs to simulate backend behavior
export const mockLoginApi = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any credentials
      const user = mockUsers[0];
      if (email && password) {
        resolve({...user});
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const mockRegisterApi = (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any valid registration
      if (name && email && password) {
        const user = {...mockUsers[0], name, email};
        resolve(user);
      } else {
        reject(new Error("Invalid registration data"));
      }
    }, 1000);
  });
};

export const mockGetDocumentsApi = (): Promise<Document[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDocuments]);
    }, 1000);
  });
};

export const mockGetDocumentApi = (id: string): Promise<DocumentDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const document = mockDocumentDetails[id];
      if (document) {
        resolve({...document});
      } else {
        reject(new Error("Document not found"));
      }
    }, 1000);
  });
};

export const mockUploadDocumentApi = (file: File): Promise<Document> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDoc: Document = {
        id: `doc${mockDocuments.length + 1}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        originalFilename: file.name,
        uploadDate: new Date().toISOString(),
        status: DocumentStatus.UPLOADED,
        userId: mockUsers[0].id,
      };
      
      mockDocuments.push(newDoc);
      
      resolve(newDoc);
    }, 2000);
  });
};
