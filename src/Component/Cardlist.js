import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useContext, createContext } from "react";
import '../App.css';

import 'antd/dist/antd.css';

const themes = {
  blue: {
    text: "rgb(97, 218, 251)",
    background: "blue",
    color: "blue",
    border: "1px solid blue",
  },
  cyan: {
    text: "rgb(97, 210, 159)",
    background: "#11052C",
    color: "cyane",
    border: "1px solid cyan",
  },
  black: {
    text: "#a8dadc",
    background: "#FFF7AE",
    color: "white",
    border: "1px solid black",
  },
};

const ThemeContext = createContext();

function Content(props) {
  return (
    <div
      style={{
        marginTop: "2em",
        position: "relative",
        left: "43%",
      }}
    >
      <Text tema={props.tema} />
    </div>
  );
}

function Text(props) {
  const theme = useContext(ThemeContext); //Use Context
  return (
    <p
      // tinggal uncomment aja
      // cara 1
      className="titleContext"
      style={{ color: theme.text }}
      // cara 2
      // className={`titleContext ${theme === themes.light ? "dark" : "light"}`}
    >
      context value {theme.text}
    </p>
  );
}

export default function Cardlist() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [db, setDb] = useState(false);
  const [valueTheme, setValueTheme] = useState(themes.cyan); //use State

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
    <div>
      <ThemeContext.Provider value={valueTheme}>
        <div
          style={{
            backgroundColor: valueTheme.background,
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            position: "relative",
            top: "-1.3em",
            overflowY: "hidden",
            maxHeight: "100%",
          }}
        >
          <ThemeContext.Provider value={valueTheme}>
            <div
              // tinggal uncoment
              // cara 1
              className="contentWrapper"
              style={{ backgroundColor: valueTheme.background }}
              // cara 2
              // eslint-disable-next-line react/jsx-no-duplicate-props
              className={`contentWrapper ${
                valueTheme === themes.black ? "cyan" : "black"
              }`}
            >
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
              <Content tema={valueTheme} />
              <button
                className="button margin"
                onClick={() =>
                  setValueTheme(
                    valueTheme === themes.blue ? themes.cyan : themes.black
                  )
                }
              >
                <center>Nyalakan Background</center>
              </button>
            </div>
          </ThemeContext.Provider>

          <div>{/* <SectionContext /> */}</div>
        </div>
      </ThemeContext.Provider>
      {/* <Axio /> */}
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