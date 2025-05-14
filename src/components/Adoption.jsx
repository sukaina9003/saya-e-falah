import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// === Layout Components ===
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7fc;
`;

const Header = styled.header`
  background-color: #4cb7af;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 24px;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1100px;
  padding: 40px;
`;

const Footer = styled.footer`
  background-color: #4cb7af;
  padding: 15px;
  text-align: center;
  color: white;
`;

// === UI Components ===
const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 30px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #2d2d2d;
  margin: 30px 0 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 30px;
  color: #444;
  font-size: 16px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: #4cb7af;
  color: white;
  padding: 14px 22px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3aa299;
  }
`;

// === Form Components ===
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FieldGroup = styled.div`
  flex: 1 1 48%;
  display: flex;
  flex-direction: column;
`;

const FullWidth = styled.div`
  flex: 1 1 100%;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  &:focus {
    border-color: #4cb7af;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  min-height: 80px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #4cb7af;
  color: white;
  padding: 14px 25px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #3aa299;
  }
`;

// === Main Adoption Instructions and Form Logic ===
const AdoptionInstructions = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your adoption application has been submitted!');
  };

  return (
    <Container>
      <Header>Edhi Foundation – Child Adoption Process</Header>

      <MainContent>
        <Card>
          {step === 1 && (
            <>
              <Title>Eligibility Requirements</Title>
              <Text>Please read these carefully before proceeding:</Text>
              <List>
                <li>Couple must be married and infertile for 10–12 years.</li>
                <li>Wife should be under 50 years old.</li>
                <li>Must own a house and have stable income.</li>
                <li>Couple should be drug-free and morally sound.</li>
              </List>
              <Text>Additional medical and legal verification may be required.</Text>
              <ButtonGroup>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={() => setStep(2)}>Next</Button>
              </ButtonGroup>
            </>
          )}

          {step === 2 && (
            <>
              <Title>Documents & Verification</Title>
              <Text>Please ensure you can provide the following:</Text>
              <List>
                <li>CNIC and Photos of both husband and wife</li>
                <li>Medical certificates from registered doctors</li>
                <li>Details of property, income, and occupation</li>
                <li>Home address and contact details</li>
                <li>Any existing children or past adoption requests</li>
              </List>
              <ButtonGroup>
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Apply for Adoption</Button>
              </ButtonGroup>
            </>
          )}

          {step === 3 && (
            <>
              <Title>Adoption Application Form</Title>
              <Form onSubmit={handleSubmit}>
                <FullWidth><SectionTitle>👤 Personal Information</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Husband's Full Name</Label>
                  <Input type="text" placeholder="Enter full name" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Wife's Full Name</Label>
                  <Input type="text" placeholder="Enter full name" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Husband's CNIC</Label>
                  <Input type="text" placeholder="e.g. 42101-1234567-1" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Wife's CNIC</Label>
                  <Input type="text" placeholder="e.g. 42101-1234567-2" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="example@domain.com" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+92-300-1234567" required />
                </FieldGroup>

                <FullWidth>
                  <Label>Home Address</Label>
                  <Input type="text" placeholder="Complete address" required />
                </FullWidth>

                <FullWidth><SectionTitle>💼 Occupation & Housing</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Occupation (Husband)</Label>
                  <Input type="text" placeholder="Profession" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Occupation (Wife)</Label>
                  <Input type="text" placeholder="Profession" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Monthly Income</Label>
                  <Input type="text" placeholder="PKR" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Do you own a house?</Label>
                  <Input type="text" placeholder="Yes / No" required />
                </FieldGroup>

                <FullWidth><SectionTitle>🧒 Other Information</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Existing Children (if any)</Label>
                  <Input type="text" placeholder="Optional" />
                </FieldGroup>

                <FieldGroup>
                  <Label>Other Adoption Requests (if any)</Label>
                  <Input type="text" placeholder="Optional" />
                </FieldGroup>

                <FieldGroup>
                  <Label>Why do you want to adopt?</Label>
                  <TextArea placeholder="Share your reason..." required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Brief Family Background</Label>
                  <TextArea placeholder="Write about your family..." required />
                </FieldGroup>

                <FullWidth><SectionTitle>📄 Document Uploads</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Upload Husband's CNIC</Label>
                  <Input type="file" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Upload Wife's CNIC</Label>
                  <Input type="file" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Upload Husband's Photo</Label>
                  <Input type="file" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Upload Wife's Photo</Label>
                  <Input type="file" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Medical Certificate (Husband)</Label>
                  <Input type="file" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Medical Certificate (Wife)</Label>
                  <Input type="file" required />
                </FieldGroup>

                <FullWidth>
                  <Label>Do both partners consent?</Label>
                  <Input type="text" placeholder="Yes / No" required />
                </FullWidth>

                <SubmitButton type="submit">Submit Application</SubmitButton>
              </Form>
            </>
          )}
        </Card>
      </MainContent>

      <Footer>&copy; 2025 Edhi Foundation</Footer>
    </Container>
  );
};

export default AdoptionInstructions;
