import { useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
// import * as Yup from "yup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Header from "./header";

const Segment = () => {


  const [objectsList, setObjectsList] = useState(false);
  const [name,setName] = useState("")
  const [whoareThey, setwhoareThey] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ])
  const [schema, setSchema] = useState([])
  const [open, setOpen] = useState(false);
  const initialvalue = {
    name: "",
  }
  const Add = {
    whoareThey: "",
  }
  const [userData] = useState(initialvalue);
  const [newSchema, setnewSchema] = useState('');
  const [formFields, setFormFields] = useState([{ Add }]);
  const [isDisable, setIsDisable] = useState(false);

  // const whoareThey = [
  //   { label: "First Name", value: "first_name" },
  //   { label: "Last Name", value: "last_name" },
  //   { label: "Gender", value: "gender" },
  //   { label: "Age", value: "age" },
  //   { label: "Account Name", value: "account_name" },
  //   { label: "City", value: "city" },
  //   { label: "State", value: "state" },
  // ];

  const handleClickOpen = () => {
    setObjectsList(true)
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setObjectsList(false);
  };

  const handleSubmit = (e) => {
    
    e.schema = schema
    console.log(e)
    
  };

  const userDataSchema = () => {

  };

  const addFields = () => {

    const selectedSchema = whoareThey.find((data, i) => {
      return data.value === newSchema
    })
    if(selectedSchema != undefined)
    {
    setSchema(schema => [...schema, selectedSchema])
    const filteredPeople = whoareThey.filter((item) => item.value !== selectedSchema.value);
    setwhoareThey(filteredPeople)
    }
    
  }



  return (
    <>
      {
        (!objectsList)
          ? <>
            { }
            <div className="addb">
              <Button variant="contained" onClick={handleClickOpen}>Save Segment</Button>
            </div>
            <br />
            {/* <Box sx={{ height: 550, width: "100%" }}>
            <DataGrid columnBuffer={9} columns={userColumns} rows={user} />
          </ Box> */}
          </>
          :
          <>
            <div>
              {/* <Button variant="outlined" onClick={handleClickOpen}>
      Open form dialog
    </Button> */}
              <Dialog open={open} onClose={handleClose}>
                <Header />
                {/* <DialogTitle>Employee Form</DialogTitle> */}
                <DialogContent>

                  <Formik
                    initialValues={userData}
                    onSubmit={handleSubmit}
                    // validationSchema={userDataSchema}
                    enableReinitialize
                  >
                    {(formik) => {
                      const { errors, touched } = formik;
                      return (

                        <form className="row g-3" onSubmit={(e) => {
                          e.preventDefault();
                          formik.handleSubmit(e);
                        }} noValidate>
                          {/* <Grid container spacing={2}> */}

                          <Grid item xs={6} md={8}>
                            <label><b>Enter the Name of the Segment</b></label>
                          </Grid><br />

                          <Grid item xs={6} md={8}>
                            <TextField variant="standard" value={formik.values.name ? formik.values.name : ""}
                              onChange={formik.handleChange} type="text" id="name" name="name" label="Name of the Segment" className="form-control" autoComplete="off" />
                            <ErrorMessage
                              name="name"
                              component="span"
                              className="error"
                            />{" "}
                          </Grid>

                          <Grid item xs={8} md={12}>
                            <label><b>To save your Segment, you need to add the schems to build the query</b></label>
                          </Grid><br />

                          <Grid container spacing={2}>
                            {formFields.map((form, index) => {
                              if (index < 7) {
                                if (index == 6) {
                                  setIsDisable(true)
                                }
                                return (
                                  <>
                                    <Grid item xs={6}>
                                      {/* <Grid item lg={3}> */}
                                      <FormControl
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        className="text-left"
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Add schema to segment
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Add schema to segment"
                                          name="Add schema to segment"
                                          value={newSchema}
                                          onChange={(event) => {

                                            setnewSchema(event.target.value);
                                            
                                          }}
                                          className="mb15 "
                                          autoComplete="off"
                                        >
                                          {whoareThey.map((name, i) => (<MenuItem value={name.value} key={i}>{name.label}</MenuItem>))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </>
                                )
                              }

                            })}



                            <Grid item xs={2} >
                              <Button variant="contained" className="mt8 fw btn2 mt40" onClick={addFields} disabled={isDisable}>
                                ADD
                              </Button>
                            </Grid>

                            <Grid item xs={24}>
                              {schema.map((data, i) => {

                                return <FormControl
                                fullWidth
                                size="small"
                                margin="dense"
                                className="text-left"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Add schema to segment
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Add schema to segment"
                                  name="Add schema to segment"
                                  value={data.value}
                                  // disabled={true}
                                  onChange={(event) => {

                                    setnewSchema(event.target.value);
                                    
                                  }}
                                  className="mb15 "
                                  autoComplete="off"
                                >
                                  {[
                                       { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
                                  ].map((name, i) => (<MenuItem value={name.value} key={i}>{name.label}</MenuItem>))}
                                </Select>
                            </FormControl>
                              })}
                            </Grid>

                                    {/* <FormControl
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        className="text-left"
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Add schema to segment
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Add schema to segment"
                                          name="Add schema to segment"
                                          value={'last_name'}
                                          // disabled={true}
                                          onChange={(event) => {

                                            setnewSchema(event.target.value);
                                            
                                          }}
                                          className="mb15 "
                                          autoComplete="off"
                                        >
                                          {whoareThey.map((name, i) => (<MenuItem value={name.value} key={i}>{name.label}</MenuItem>))}
                                        </Select>
                                    </FormControl> */}

                            <Grid item xs={12}>
                              <div className="action-btn">
                                <Button
                                  className="btn-fill pull-right"
                                  type="submit"
                                  variant="outlined"
                                  // color="secondary"
                                  onClick={() => {
                                    setOpen(false);
                                    setObjectsList(false);
                                  }}
                                >
                                  Cancel
                                </Button>&nbsp;&nbsp;

                                <Button
                                  className="btn-fill pull-right update-profile"
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                >
                                  Save the segment
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </form>
                      );
                    }}
                  </Formik>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>close</Button>
                  {/* <Button onClick={handleClose}>Submit</Button> */}
                </DialogActions>
              </Dialog>
            </div>
          </>
      }

    </>
  )
}

export default Segment


