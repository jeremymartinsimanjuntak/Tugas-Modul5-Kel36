import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import 'antd/dist/antd.css';

export default function Cardlist() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [db, setDb] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const action=() => {
alert ('Berhasil!');
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
      headers: {
        accept: "/",
      },
    })
      .then((data) => {
        console.log('data',data.data);
        setDb(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <div>
    <h1 className="margin"><center>Tugas Modul 5 Kelompok 36</center> </h1>
    </div>
      <div className="margin" style={{ marginTop: 10, color: "transparent",
              Width: "100%" }}>
        <Grid
          container
          md={7}
          spacing={3}
          style={{ marginTop: "50px", marginLeft: "50px" }}
          
        >
          {db.length > 0 && db.map((results, index) => 
             (
              <Grid item key={results.id} md={5}>
                <Card>
                  <CardActionArea onClick={showModal}>
                    <CardContent>
                      <Typography>Nama: {results.name}</Typography>
                      <Typography>NIM: {results.nim}</Typography>
                      <Typography>TTL: {results.ttl}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </div>
      <Modal title="Deskripsi"
        visible={isModalVisible}
        onOk={action}
        onCancel={handleOk}
      >
          <p>Detail Test</p>
          <p>Kelompok 36</p>
      </Modal>
    </>
  );
}