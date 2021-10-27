import React, { useState } from "react";
// import { Grid, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
// import "./styles.css";
import {
    CCol,
    CRow,
    CInput
} from '@coreui/react'

function App1() {
    const [selectedYear, setSelectedYear] = useState([]);

    const testSchema = Yup.object().shape({
        name: Yup.string().required("Enter Name"),
        year: Yup.string().required("Select Year")
    });

    const initialValues = {
        name: "",
        year: ""
    };

    const handleYearChange = (selectedYear, values) => {
        values.year = selectedYear.value;
        console.log(selectedYear);
        setSelectedYear(selectedYear);
    };

    const yearOptions = [
        { value: "1960", label: "1960" },
        { value: "1961", label: "1961" },
        { value: "1962", label: "1962" },
        { value: "1963", label: "1963" },
        { value: "1964", label: "1964" },
        { value: "1965", label: "1965" }
    ];

    return (
        <Formik validationSchema={testSchema} initialValues={initialValues}>
            {({
                handleChange,
                values,
                errors,
                handleSubmit,
            }) => {
                return (
                    <>
                        <CRow container spacing={2}>
                            <CCol item md={12} xs={12}>
                                <CInput
                                    label="Name"
                                    name="name"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange("name")}
                                    style={{ width: "100%", zIndex: 0 }}
                                    value={values.name}
                                    onBlur={() => {
                                        console.log("name");
                                    }}
                                />
                                {errors.name}
                            </CCol>

                            <CCol item md={6} xs={12}>
                                <Select
                                    isMulti
                                    placeholder="Year"
                                    value={selectedYear}
                                    onChange={selectedOption => {
                                        // handleYearChange(selectedOption);
                                        // handleYearChange(selectedOption, values);
                                        // values.year = selectedOption.value;
                                        // console.log("values", values.year);
                                        console.log(selectedOption)
                                        handleChange("year")(selectedOption.value)
                                    }}
                                    isSearchable={true}
                                    options={yearOptions}
                                    name="year"
                                />
                                {errors.year}
                            </CCol>
                            <CCol
                                item
                                md={4}
                                style={{ marginTop: "24px", marginBottom: "10px" }}
                                xs={12}
                            >
                                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                            </CCol>
                        </CRow>
                    </>
                );
            }}
        </Formik>
    );
}
export default App1
