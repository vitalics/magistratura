import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Menu from '../components/menu';
import Subjects from '../components/load/subjects';
import Professors, { PerfUser } from '../components/load/prefessors';

import { getSubjects, getUsersByDepartment, syncUserWithSubjects } from '../firebase';
import Table from '../components/load/table';
import { Rows } from '../types/load';
import { DBUser } from '../types/auth';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Subjects', 'Subject Info', 'Add a prefessors'];
}


export default function Load() {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<DBUser[]>([]);
  const steps = getSteps();
  const [rows, setRows] = React.useState<Rows>([]);
  const [loading, setLoading] = React.useState(false);
  const [linkedUsers, setLinkedUsers] = React.useState<PerfUser[]>([]);

  React.useEffect(() => {
    getUsersByDepartment({ includeMySelf: true }).then(setUsers);
  }, []);


  const getStepContent = React.useCallback((stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Subjects selectedSubjects={selectedSubjects} onRightItemsChanged={setSelectedSubjects} />;
      case 1:
        return <Table subjects={selectedSubjects} onRowsChanged={setRows}></Table>;
      case 2:
        return <Professors subjects={rows} professors={users} onDataChanged={setLinkedUsers} />;
      default:
        return 'Unknown stepIndex';
    }
  }, [rows, selectedSubjects, users]);

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length) {
      setLoading(true);
      syncUserWithSubjects(linkedUsers).then(() => {
        setLoading(false);
        history.push('/profile');
      })
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Menu />
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <>
              <CircularProgress />
              {syncUserWithSubjects(linkedUsers).then(() => {
                setLoading(false);
                history.push('/profile')
              })}
            </>
            // <div>
            //   <Typography className={classes.instructions}>All steps completed</Typography>
            //   <Button onClick={handleReset}>Reset</Button>
            // </div>
          ) : (
              <div>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}