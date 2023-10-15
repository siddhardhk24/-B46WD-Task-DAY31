import { useEffect, useState } from "react";
import CrumBar from "./CrumBar";
import NavSideBar from "./NavSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { Appstate } from "../context/AppProvider";
import { API } from "../API/api";

export default function EditStudents() {
  const { studentData, setData } = Appstate();
  const navigate = useNavigate();

  const { id } = useParams();


  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Batch, setBatch] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const selectedStudent = studentData.find((stud, index) => stud.id == id);

    
    setName(selectedStudent.Name);
    setEmail(selectedStudent.Email);
    setQualification(selectedStudent.Qualification);
    setBatch(selectedStudent.Batch);
    setMobile(selectedStudent.mobile);
    
  }, [id, studentData]);

 async function editStudent() {
    const editedStudObj = {
    
      Name,
      Email,
      Qualification,
      Batch,
      mobile
    };
    // console.log(editedStudObj)

    const response = await fetch(`${API}/${id}`,{
      method:"PUT",
      body: JSON.stringify(editedStudObj),
      headers:{
        "Content-type":"application/json"
      }
    })

    const data = await response.json()

    const editIndex = studentData.findIndex((stud, index) => stud.id == id);
    studentData[editIndex] = data;


    setData([...studentData]);

    navigate("/students/all");
  }

  return (
    <NavSideBar>
      <CrumBar />
      <div className="form-control text-center items-center overflow-y-scroll">
        <h1 className="m-5">Fill the Data to add a New Students</h1>

        <label className="input-group">
          <span className="w-48">NAME</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-auto m-5"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="input-group">
          <span className="w-48">MAIL</span>
          <input
            type="text"
            placeholder="Enter your mail"
            className="input input-bordered w-auto m-5"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input-group">
          <span className="w-48">QUALIFICATION</span>
          <input
            type="text"
            placeholder="Enter your qualification"
            className="input input-bordered w-auto m-5"
            value={Qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </label>
        <label className="input-group">
          <span className="w-48">BATCH</span>
          <input
            type="text"
            placeholder="Enter your batch"
            className="input input-bordered w-auto m-5"
            value={Batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </label>
        <label className="input-group">
          <span className="w-48">MOBILE NUMBER</span>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className="input input-bordered w-auto m-5"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
        <button
          className="btn btn-primary w-48 mt-20 rounded-full"
          onClick={() => editStudent()}
        >
          Edit Student
        </button>
      </div>
    </NavSideBar>
  );
}
