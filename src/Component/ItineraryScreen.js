import React, { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
const ItineraryScreen = () => {
  const moment = require("moment");
  const [itineraryName, setItineraryName] = useState("Itinerary A");
  const [selectedUsers, setSelectedUsers] = useState([
    { value: "vip", label: "VIP" },
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    description: "",
  });

  const [data, setData] = useState([
    {
      title: "Test Insert1",
      type: "Activity",
      date: "2025-01-19",
      time: "07:20",
      description:
        "It is a long established fact that a sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      title: "Test insert2",
      type: "Hotel/Accommodation",
      date: "2025-05-11",
      time: "12:50",
      description:
        "It is a long established  at its layout.  English. Many desktop  as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
  ]);

  console.log("DATA", data?.length);

  const handleSubmit = () => {
    if (
      newItem.title &&
      newItem.type &&
      newItem.date &&
      newItem.time &&
      newItem.description
    ) {
      setData([...data, newItem]);
      setStatus(false);
      toast.success("Added successfully!");
      setNewItem({
        title: "",
        type: "",
        date: "",
        time: "",
        description: "",
      });
    } else {
      status && toast.error("All fields are required!");
    }
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const userOptions = [
    { value: "organizer", label: "Organizer" },
    { value: "guest", label: "Guest" },
    { value: "vip", label: "VIP" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "50px",
      background: "#fff",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ced4da",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#fff",
      border: "1px solid #c2c2c2",
      borderRadius: "20px",
      padding: "2px 8px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      "&:hover": {
        backgroundColor: "transparent",
        color: "#666",
      },
    }),
  };

  const handleDelete = (index) => {
    const updatedData = data?.filter((ele, i) => i !== index);
    setData(updatedData);
    toast.success("Deleted Successfully!");
  };

  const handleEdit = (ele, index) => {
    setIsEditing(index);
    setNewItem(ele);
    setStatus1(true);
  };

  const handleUpdate = (index) => {
    if (
      newItem.title &&
      newItem.type &&
      newItem.date &&
      newItem.time &&
      newItem.description
    ) {
      const updatedData = [...data];
      updatedData[index] = newItem;
      setData(updatedData);
      setIsEditing(null);
      setNewItem({
        title: "",
        type: "",
        date: "",
        time: "",
        description: "",
      });
      setStatus1(false);
      toast.success("Updated successfully!");
    } else {
      toast.error("All fields are required!");
    }
  };

  const handleNameChange = (e) => {
    setItineraryName(e.target.value);
  };

  const handleUserChange = (selected) => {
    setSelectedUsers(selected);
  };
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #c2c2c2",
          margin: "14px 44px",
          textAlign: "left",
        }}
      >
        <h3 style={{ marginBottom: "1px", marginLeft: "14px" }}>
          Edit Itinerary
          <small style={{ color: "#6b7280", width: "2px" }}>
            (ID: 182d4967376D0475)
          </small>
        </h3>

        <div style={{ color: "#6b7280", marginLeft: "14px" }}>
          Create a custom itinerary with activities and accommodations for your
          attendees.
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6">
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "11px",
                    color: "#3d3d3d",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Itinerary Name
                </label>
                <input
                  type="text"
                  onChange={handleNameChange}
                  value={itineraryName}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #c2c2c2",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Enter Itinerary Name"
                />
              </div>
            </div>
            <div className="col-md-6" style={{ marginBottom: "12px" }}>
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    marginBottom: "11px",
                    color: "#3d3d3d",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Assign User or User Groups
                </label>
                <Select
                  id="userSelect"
                  isMulti
                  options={userOptions}
                  value={selectedUsers}
                  onChange={handleUserChange}
                  styles={customStyles}
                  placeholder="Select users or groups..."
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid #c2c2c2",
          paddingBottom: "16px",
          margin: "4px 44px",
          textAlign: "left",
        }}
      >
        <h4 style={{ marginBottom: "1px", marginLeft: "14px" }}>
          Itinerary Items
        </h4>

        <div
          style={{
            color: "#6b7280",
            marginLeft: "14px",
            paddingBottom: "22px",
          }}
        >
          You can drag and rearrange itinerary items.
        </div>

        {data?.map((ele, index) => {
          return (
            <>
              {isEditing === index && status1 ? (
                <div
                  style={{
                    border: "1px solid #c2c2c2",
                    borderRadius: "8px",
                    padding: "24px",
                    marginLeft: "44px",
                  }}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#3d3d3d",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Activity Title*
                        </label>
                        <input
                          type="text"
                          value={newItem?.title}
                          onChange={handleInputChange}
                          name="title"
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #c2c2c2",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                          placeholder="Enter activity title"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",

                            color: "#3d3d3d",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Activity Type*
                        </label>
                        <select
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #c2c2c2",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                          value={newItem?.type}
                          onChange={handleInputChange}
                          name="type"
                        >
                          <option value="">Select activity type</option>
                          <option value="Flight">Flight</option>
                          <option value="Hotel/Accommodation">
                            Hotel/Accommodation
                          </option>
                          <option value="Activity">Activity</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#3d3d3d",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Activity Date*
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="date"
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #c2c2c2",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                            value={newItem?.date}
                            onChange={handleInputChange}
                            name="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#3d3d3d",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Start Time (24-hour format)*
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="time"
                            value={newItem?.time}
                            onChange={handleInputChange}
                            name="time"
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #c2c2c2",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#3d3d3d",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Activity Description*
                        </label>
                        <textarea
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #c2c2c2",
                            borderRadius: "4px",
                            fontSize: "14px",
                            minHeight: "100px",
                            resize: "vertical",
                          }}
                          value={newItem?.description}
                          onChange={handleInputChange}
                          name="description"
                          placeholder="Enter a short description..."
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <button
                        style={{
                          padding: "6px 36px",
                          border: "1px solid #c2c2c2",
                          borderRadius: "4px",
                          backgroundColor: "transparent",
                          color: "#6b7280",
                          cursor: "pointer",
                          fontSize: "14px",
                          float: "right",
                          fontWeight: "600",
                          marginLeft: "22px",
                        }}
                        onClick={() => setStatus1(false)}
                      >
                        Close
                      </button>
                      <button
                        style={{
                          padding: "6px 30px",
                          border: "1px solid #3b82f6",
                          borderRadius: "4px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "14px",

                          float: "right",
                        }}
                        onClick={() => handleUpdate(index)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid #c2c2c2",
                    borderRadius: "8px",
                    padding: "16px",
                    marginLeft: "44px",
                    marginBottom: "22px",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <h5 style={{ marginBottom: "8px" }}>{ele?.title}</h5>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            border: "1px solid gray",
                            padding: "4px",
                            borderRadius: "5px",
                          }}
                        >
                          {ele?.type}
                        </span>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "15px",
                            marginLeft: "4px",
                          }}
                        >
                          {moment(ele?.date).format("DD MMM YYYY")}
                        </span>
                        <span
                          style={{
                            fontWeight: "700",
                            marginLeft: "4px",
                            fontSize: "15px",
                          }}
                        >
                          - {moment(ele?.time, "HH:mm").format("h:mm A")}
                        </span>
                      </div>
                      <div>
                        <p style={{ marginBottom: "8px" }}>
                          {ele?.description}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gep: "400px",
                        }}
                      >
                        <div
                          style={{
                            background: "none",
                            color: "#3b82f6",
                            cursor: "pointer",
                            fontSize: "22px",
                            fontWeight: "500",
                          }}
                        >
                          Manage Vouchers
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div
                        style={{ margin: "5px", cursor: "pointer" }}
                        onClick={() => handleEdit(ele, index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </div>
                      <div
                        onClick={() => handleDelete(index)}
                        style={{ margin: "5px 12px", cursor: "pointer" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}

        {status && (
          <div
            style={{
              border: "1px solid #c2c2c2",
              borderRadius: "8px",
              padding: "24px",
              marginLeft: "44px",
            }}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#3d3d3d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Activity Title*
                  </label>
                  <input
                    type="text"
                    value={newItem?.title}
                    onChange={handleInputChange}
                    name="title"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #c2c2c2",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                    placeholder="Enter activity title"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",

                      color: "#3d3d3d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Activity Type*
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #c2c2c2",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                    value={newItem?.type}
                    onChange={handleInputChange}
                    name="type"
                  >
                    <option value="">Select activity type</option>
                    <option value="Flight">Flight</option>
                    <option value="Hotel/Accommodation">
                      Hotel/Accommodation
                    </option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#3d3d3d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Activity Date*
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="date"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #c2c2c2",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                      value={newItem?.date}
                      onChange={handleInputChange}
                      name="date"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#3d3d3d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Start Time (24-hour format)*
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="time"
                      value={newItem?.time}
                      onChange={handleInputChange}
                      name="time"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #c2c2c2",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#3d3d3d",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Activity Description*
                  </label>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #c2c2c2",
                      borderRadius: "4px",
                      fontSize: "14px",
                      minHeight: "100px",
                      resize: "vertical",
                    }}
                    value={newItem?.description}
                    onChange={handleInputChange}
                    name="description"
                    placeholder="Enter a short description..."
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  style={{
                    padding: "6px 36px",
                    border: "1px solid #c2c2c2",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    color: "#6b7280",
                    cursor: "pointer",
                    fontSize: "14px",
                    float: "right",
                    fontWeight: "600",
                  }}
                  onClick={() => setStatus(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          style={{
            width: "97%",
            marginTop: "16px",
            padding: "8px",
            border: "1px solid #c2c2c2",
            borderRadius: "4px",
            backgroundColor: "white",
            color: "#3b82f6",
            cursor: "pointer",
            fontSize: "14px",
            marginLeft: "42px",
            fontWeight: "600",
          }}
          onClick={() => setStatus(true)}
        >
          + New Activity
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "24px",
            paddingTop: "16px",
          }}
        >
          <button
            style={{
              padding: "6px 46px",
              border: "1px solid #c2c2c2",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
            onClick={() => setStatus(false)}
          >
            Close
          </button>
          <button
            style={{
              padding: "6px 46px",
              border: "1px solid #3b82f6",
              borderRadius: "4px",
              backgroundColor: status1 ? "#9ca3af" : "#3b82f6",
              color: "white",
              fontSize: "14px",
              cursor: status1 ? "not-allowed" : "pointer",
            }}
            disabled={status1}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryScreen;
