import React, {useState, useEffect} from "react";
import { Tag, Table, Button, message} from "antd";
import { getMyTheatres } from "../api/theatre";
import TheatreForm from "./TheatreForm";
import { PlusOutlined } from "@ant-design/icons";

function Partner() {
  const [loading, setLoading] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  const handleAddTheatre = () => {
    setOpen(true);
  }

  const fetchTheatres = async () => {
    try{
      setLoading(true);
      const response = await getMyTheatres();
      console.log(response);
      if(response.success){
        setTheatres(response.data);
      }else{
        message.error(response.message);
      }
    }catch(err){
      message.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTheatres();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="red">Pending</Tag>
        ),
    },
  ];
  return (
    <div>
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}>
          <h2 style={{ margin: 0 }}>Partner Theatres</h2>
      <Button type="primary" icon={<PlusOutlined />}  onClick={handleAddTheatre}>
          Add Theatre
        </Button>
        <TheatreForm
          open={open}
          setOpen={setOpen}
          onSuccess={fetchTheatres}
          selectedTheatre={selectedTheatre}
        />
      </div>
    <Table
      columns={columns}
      dataSource={theatres}
      rowKey="_id"
      loading={loading}
    />
    </div>
  );
}

export default Partner;
