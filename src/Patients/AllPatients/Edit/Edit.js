import React, {useEffect,useState} from "react"
import {
    TextField,
    Grid,
    useMediaQuery,
    Button,
    Box,
    CircularProgress,
    Typography,
    MenuItem,
  } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { NavLink } from "react-router-dom";


  const schema = yup.object().shape({
    name: yup.string().required(" Name is required"),
    bloodGroup: yup.string().required(" Blood Group is required"),
    gender: yup.string().required(" Gender is required"),
    admissionDate: yup.string().required("Admission Date is required"),
    mobileNo: yup.string().required(" Mobile No is required"),
    email: yup.string().required(" Email is required"),
    address: yup.string().required(" Address is required"),
    treatment: yup.string().required(" Treatment is required"),
    medicalHistory: yup.mixed(),
    status: yup.string().required(" Status is required"),
  });

const EditPatient =({handleCreate, editData, handleClose})=>
{
  const isSmScreen = useMediaQuery("(max-width:768px)");

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;
  
    const [loading, setLoading] = useState(false)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });
   
     useEffect(() => {
        if (editData) {
          reset({
            name: editData.name || "",
            treatment: editData.treatment || "",
            mobileNo: editData.mobileNo || "",
            email: editData.email || "",
            gender: editData.gender || "",
            address: editData.address || "",
            admissionDate:new Date(editData.admissionDate).toISOString().split("T")[0] || "",
            bloodGroup: editData.bloodGroup || "",
            medicalHistory: editData.medicalHistory || "",
            status: editData.status || "",
          });
        }
      }, [editData, reset]);
    

  
  
    const onSubmit = (data) => {
    
           setLoading(true)
           console.log(data);
  
          const formdata = new FormData();
          formdata.append("name", data.name);
          formdata.append("treatment", data.treatment);
          formdata.append("mobileNo", data.mobileNo);
          formdata.append("email", data.email);
          formdata.append("gender", data.gender);
          formdata.append("address", data.address);
          formdata.append("admissionDate", data.admissionDate);
          formdata.append("bloodGroup", data.bloodGroup);
          formdata.append("medicalHistory", data.medicalHistory[0]);
      
          const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`, 
             },
          };
      
          fetch(`${Base_url}/allpatients/${editData._id}`, requestOptions)
            .then((response) => response.text())
      
            .then((result) => {
      
              const res = JSON.parse(result)
      
              if(res.status==="success")
              {
                setLoading(false)
               
                toast.success(" Patients Updated Successfully!")
                handleCreate(true)
                handleClose()
                reset();
              }
              else {
      
                setLoading(false)
                toast.error(res.message)
      
              }
            })
            .catch((error) => console.error(error));
    };

     return (
        <>
        
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                 Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.name?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              select
              label={
                <>
                  Gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("gender")}
              error={!!errors.gender}
              fullWidth
              margin="normal"
              defaultValue={editData.gender}
              SelectProps={{
                MenuProps: {
                PaperProps: {
                    style: { maxHeight: 200 },
                },
                },
            }}
            >

              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="others">Others</MenuItem>

            </TextField>
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.gender?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}> 
            <TextField
              type="number"
              label={
                <>
                  Mobile No <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("mobileNo")}
              error={!!errors.mobileNo}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.mobileNo?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Email Id <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.email?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            
              select
              label={
                <>
                  Blood Group <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }

              variant="outlined"
              {...register("bloodGroup")}
              error={!!errors.bloodGroup}
              fullWidth
              margin="normal"
              defaultValue={editData.bloodGroup}

              SelectProps={{
                MenuProps: {
                PaperProps: {
                    style: { maxHeight: 200 },
                },
                },
            }}
            >
                 <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>

            </TextField>
            
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.bloodGroup?.message}
            </div>
          </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

          <TextField
            type="file"
            InputLabelProps={{ shrink: true }}
            label={
              <>
                Medical History{" "}
                <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
            }
            variant="outlined"
            {...register("medicalHistory")}
            error={!!errors.medicalHistory}
            fullWidth
            margin="normal"
            inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
          />

          <Typography variant="body2" sx={{ mt: 0 }}>
                  View existing certificate:&nbsp;
                  <NavLink 
                    to={editData.medicalHistory} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Medical History Certificate
                  </NavLink>
                </Typography>
        
        <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
          {errors.medicalHistory?.message}
        </div>

      </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              type="date"
              label={
                <>
                  Admit Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("admissionDate")}
              error={!!errors.admissionDate}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.admissionDate?.message}
            </div>
          </Grid>
   
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <TextField
                        InputLabelProps={{shrink:true}}
                          select
                          label={
                              <>
                             Status<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                              </>
                          }
                            variant="outlined"
                              fullWidth
                              margin="normal"
                          {...register("status")}

                         defaultValue={editData.status}
                          error={!!errors.status}
                          
                          SelectProps={{
                              MenuProps: {
                              PaperProps: {
                                  style: { maxHeight: 200 },
                              },
                              },
                          }}
                          > 
                     <MenuItem value="Under Observation">Under Observation</MenuItem>
                    <MenuItem value="Under Treatment">Under Treatment</MenuItem>
                    <MenuItem value="Recovered">Recovered</MenuItem>

                          </TextField>
                      <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                        {errors.status?.message}
                      </div>
                    </Grid>

                   <Grid item xs={12} sm={12} md={12}>
                <TextField
                  type="text"
                  label={
                    <>
                      Address <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                    </>
                  }
                  variant="outlined"
                  {...register("address")}
                  error={!!errors.address}
                  fullWidth
                  multiline
                  margin="normal"
                />
                <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                  {errors.address?.message}
                </div>
          </Grid>
        </Grid>
                   

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
          <Button onClick={handleClose} className="secondary_button">
            Cancel
          </Button>
          <Button type="submit" className="primary_button">
     {loading ? ( <>
          <CircularProgress
           size={18}
           style={{ marginRight: 8, color: "#fff" }}
          /> 
            Updating
          </> 
          )   : "Update"}
            

          </Button>
        </Box>
      </form>

        </>
     )
}

export default EditPatient;