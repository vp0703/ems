import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, selectCountryNameById } from "../features/countries/countriesSlice";
import {
  clearSearchResult,
  createEmployee,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployees,
  updateEmployee,
} from "../features/employees/employeeSlice";

import ErrorAlert from "../components/layout/ErrorAlert";
import Loader from "../components/layout/Loader";
import ConfirmModel from "../components/layout/ConfirmModel";
import EmployeeList from "../components/employees/EmployeeList";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeSearchById from "../components/employees/EmployeeSearchById";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required").min(2).max(50),
  email: yup.string().required("Email is required").email("Invalid email"),
  mobile: yup.string().required("Mobile is required").min(8).max(15),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required").min(2).max(30),
  district: yup.string().required("District is required").min(2).max(30),
});

const emptyValues = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: "",
};

export default function EmployeesPage() {
  const dispatch = useDispatch();

  const countries = useSelector((s) => s.countries.items);
  const countriesLoading = useSelector((s) => s.countries.loading);
  const countriesError = useSelector((s) => s.countries.error);

  const employees = useSelector((s) => s.employees.items);
  const loading = useSelector((s) => s.employees.loading);
  const error = useSelector((s) => s.employees.error);

  const byIdLoading = useSelector((s) => s.employees.byIdLoading);
  const byIdError = useSelector((s) => s.employees.byIdError);
  const searchedEmployee = useSelector((s) => s.employees.searchedEmployee);

  const saving = useSelector((s) => s.employees.saving);
  const saveError = useSelector((s) => s.employees.saveError);

  const deletingId = useSelector((s) => s.employees.deletingId);
  const deleteError = useSelector((s) => s.employees.deleteError);

  const [mode, setMode] = useState("list"); // list | add | edit
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, emp: null });

  const getCountryName = useMemo(() => {
    return (countryId) => selectCountryNameById({ countries: { items: countries } }, countryId);
  }, [countries]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const startAdd = () => {
    setMode("add");
    setEditing(null);
    reset(emptyValues);
  };

  const startEdit = (emp) => {
    setMode("edit");
    setEditing(emp);
    reset({
      name: emp.name ?? "",
      email: emp.email ?? "",
      mobile: emp.mobile ?? "",
      country: String(emp.country ?? ""),
      state: emp.state ?? "",
      district: emp.district ?? "",
    });
  };

  const cancelForm = () => {
    setMode("list");
    setEditing(null);
    reset(emptyValues);
  };

  const onSubmit = async (values) => {
    if (mode === "add") {
      const res = await dispatch(createEmployee(values));
      if (res.meta.requestStatus === "fulfilled") cancelForm();
    } else if (mode === "edit" && editing?.id) {
      const res = await dispatch(updateEmployee({ id: editing.id, payload: values }));
      if (res.meta.requestStatus === "fulfilled") cancelForm();
    }
  };

  const askDelete = (emp) => setConfirm({ show: true, emp });
  const closeConfirm = () => setConfirm({ show: false, emp: null });

  const confirmDelete = async () => {
    const id = confirm.emp?.id;
    if (!id) return closeConfirm();
    const res = await dispatch(deleteEmployee(id));
    if (res.meta.requestStatus !== "rejected") closeConfirm();
  };

  const filteredEmployees = searchedEmployee
  ? employees.filter((emp) => String(emp.id) === String(searchedEmployee.id))
  : employees;

  const doSearchById = (id) => {
    dispatch(fetchEmployeeById(id));
  };

  const clearSearch = () => dispatch(clearSearchResult());

  return (
    <Container className="py-3">
      <ErrorAlert error={countriesError || error || saveError || deleteError} />

      {(countriesLoading && countries.length === 0) || (loading && employees.length === 0) ? (
        <Loader text="Loading data..." />
      ) : null}

      <EmployeeSearchById
        onSearch={doSearchById}
        onClear={clearSearch}
        loading={byIdLoading}
        error={byIdError}
        result={searchedEmployee}
        getCountryName={getCountryName}
      />

      {mode === "list" ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="m-0">Employees</h4>
            <Button onClick={startAdd}>Add Employee</Button>
          </div>

          <EmployeeList
              employees={filteredEmployees}
            getCountryName={getCountryName}
            onEdit={startEdit}
            onDelete={askDelete}
            deletingId={deletingId}
          />
        </>
      ) : (
        <EmployeeForm
          title={mode === "add" ? "Add Employee" : `Edit Employee (ID: ${editing?.id})`}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          countries={countries}
          saving={saving}
          onCancel={cancelForm}
          onSubmit={onSubmit}
        />
      )}

      <ConfirmModel
        show={confirm.show}
        title="Delete employee?"
        body={`Are you sure you want to delete "${confirm.emp?.name}"?`}
        onClose={closeConfirm}
        onConfirm={confirmDelete}
        busy={String(deletingId) === String(confirm.emp?.id)}
      />
    </Container>
  );
}