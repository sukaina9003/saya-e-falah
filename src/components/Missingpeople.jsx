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
  min-height: 8px;
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

// === Main Component ===
const MissingPersonReport = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Missing person report submitted successfully!');
  };

  return (
    <Container>
      <Header>Edhi Foundation – Report a Missing Person</Header>

      <MainContent>
        <Card>
          {step === 1 && (
            <>
              <Title>Instructions Before Reporting</Title>
              <Text>Please ensure the following steps have been taken:</Text>
              <List>
                <li>Visit nearest Edhi Center and report the case in person if possible.</li>
                <li>Keep a recent photo and details of the missing person.</li>
                <li>File a police report at the local police station.</li>
                <li>Ensure your contact details are reachable for follow-up.</li>
              </List>
              <ButtonGroup>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={() => setStep(2)}>Proceed to Report</Button>
              </ButtonGroup>
            </>
          )}

          {step === 2 && (
            <>
              <Title>Missing Person Report Form</Title>
              <Form onSubmit={handleSubmit}>
                <FullWidth><SectionTitle>👤 Missing Person Information</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Full Name</Label>
                  <Input type="text" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Age</Label>
                  <Input type="number" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Gender</Label>
                  <Input type="text" placeholder="Male / Female / Other" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Date Last Seen</Label>
                  <Input type="date" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Last Known Location</Label>
                  <Input type="text" required />
                </FieldGroup>

                <FieldGroup>
                  <Label>Clothing Description</Label>
                  <Input type="text" required />
                </FieldGroup>

                <FullWidth>
                  <Label>Additional Identifying Details</Label>
                  <Input type="text" required />
                  {/* <TextArea placeholder="Scars, behavior, illness, etc." /> */}
                </FullWidth>

                <FullWidth><SectionTitle>📞 Reporter Contact Information</SectionTitle></FullWidth>

                <FieldGroup>
                  <Label>Your Full Name</Label>
                  <Input type="text" required />
                </FieldGroup>
                <FieldGroup>
                  <Label>Contact Number</Label>
                  <Input type="tel" required />
                </FieldGroup>

                <FullWidth>
                  <Label>Upload Recent Photo</Label>
                  <Input type="file" required />
                </FullWidth>

                <SubmitButton type="submit">Submit Report</SubmitButton>
              </Form>

              <ButtonGroup>
                <Button secondary="true" onClick={() => setStep(1)}>Back to Instructions</Button>
              </ButtonGroup>
            </>
          )}
        </Card>
      </MainContent>

      <Footer>&copy; 2025 Edhi Foundation</Footer>
    </Container>
  );
};

export default MissingPersonReport;
