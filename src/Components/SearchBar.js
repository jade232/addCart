import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Modal from 'react-modal';
import Badge from '@mui/material/Badge';

const customStyles = {
  content: {
    top: '35%',
    left: '35%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    opacity: '3',
  },
};

Modal.setAppElement('#root')

function SearchBar({ placeholder, data}) {
  const [filtered, setFiltered] = useState([]);
  const [words, setWords] = useState("");
  const[count, setCount] = useState(0);
  const[modalIsOpen, setModalIsOpen] = useState(false)


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWords(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

   

    if (searchWord === "") {
      setFiltered([]);
    } else {
      setFiltered(newFilter);
    }
  };

  const clearInput = () => {
    setFiltered([]);
    setWords("");
  };

  useEffect( () => {
    setModalIsOpen(false)
  },[count]
  )
  

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={words}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filtered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        <div>
            <Badge badgeContent={count} color="primary" >
              <ShoppingCartIcon />
            </Badge>
        </div>
        </div>
      </div>
      {filtered.length !== 0 && (
        <div className="dataResult">
          {filtered.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} rel="noreferrer" target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
      {filtered.length !== 0 && (
      <Card sx={{ maxWidth: 300 }}>
        <CardActions>
          <Button><ArrowCircleDownIcon onClick={() => setCount( count - 1)}></ArrowCircleDownIcon></Button>
          <Button size="small" onClick={() => setModalIsOpen(true)}> Add to Cart</Button>
          <Button><ArrowCircleUpIcon onClick={() => setCount( count + 1)}></ArrowCircleUpIcon></Button>
        </CardActions>
        <Modal isOpen={modalIsOpen} onRequestClose={ () => setModalIsOpen(false)} style={customStyles}>
          <h4>Added Successfully</h4>
          <Button size="small" onClick={() => setModalIsOpen(false)}>Close</Button>
        </Modal>
      </Card>
      )}
    </div>
  );
}

export default SearchBar;