import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import notification from "antd/es/notification";
import NavMenuLayout from "../../../utils/NavMenuLayout";
import { StyleSheet, css } from "aphrodite-jss";
import { Button, Switch, Table } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Popconfirm, message } from "antd";
import AddEmployeeModal from "./AddEmployeeModal";

const handleErrorNotification = (message, description) =>
  notification.error({ message, description });

const Employees = () => {
  const [employeeArr, setEmployeeArr] = useState([]);
  const [addEmployeeModal, toggleAddEmployeeModal] = useState(false);

  useEffect(() => {
    axios
      .get(`/employees/getall`)
      .then((res) => setEmployeeArr(res.data.data))
      .catch((err) => handleErrorNotification("Error in fetching", err));
  }, []);

  const ButtonsList = () => {
    return (
      <div className={css(styles.buttonContainer)}>
        <Button type="primary" onClick={() => toggleAddEmployeeModal(true)}>
          Add Employee
        </Button>
      </div>
    );
  };

  return (
    <NavMenuLayout>
      <ButtonsList />
      <div className={css(styles.tableContainer)}>
        <Table
          dataSource={employeeArr}
          rowKey="_id"
          columns={[
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "First Name",
              dataIndex: "first_name",
            },
            {
              title: "Last Name",
              dataIndex: "last_name",
            },
            {
              title: "Phone Number",
              dataIndex: "phone_number",
            },
            {
              title: "Locked Status",
              dataIndex: "locked",
              render: (bool, employee) => (
                <Switch
                  checked={bool}
                  onChange={() => {
                    let Payload = {
                      locked: !employee.locked,
                    };
                    console.log(Payload);
                    axios
                      .put(`/employees/update/${employee._id}`, Payload)
                      .then((res) => {
                        setEmployeeArr((prevState) => {
                          let newState = prevState.map((row) => {
                            if (row._id == employee._id) {
                              row.locked = !row.locked;
                            }
                            return row;
                          });
                          return newState;
                        });
                      })
                      .catch((err) => message.error(err));
                  }}
                />
              ),
            },
            {
              title: "Delete Employee",
              dataIndex: "_id",
              render: (_id, employee) => (
                <Popconfirm
                  title="Are you sure to delete this product from inventory?"
                  onConfirm={() => {
                    axios
                      .delete(`/employees/delete/${_id}`)
                      .then((res) =>
                        setEmployeeArr((prevState) =>
                          prevState.filter((emp) => emp._id != _id)
                        )
                      )
                      .catch((err) => message.error(err));
                  }}
                  onCancel={() => message.success("deletion avoided")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              ),
            },
          ]}
        />
      </div>
      <AddEmployeeModal
        visible={addEmployeeModal}
        toggleVisible={toggleAddEmployeeModal}
        setEmployeeArr={setEmployeeArr}
      />
    </NavMenuLayout>
  );
};

export default Employees;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: "20px 40px 0px 40px",
    display: "flex",
    flexDirection: "row",
  },
  tableContainer: {
    padding: "40px",
  },
});
