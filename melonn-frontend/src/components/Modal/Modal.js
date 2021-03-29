import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { developmentUrl } from '../../utils/urls';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = ({rowData, openModal,setOpenModal}) => {

    const [sellData, setSellData] = useState({})

    useEffect(() => {
        const getInfo = async() => {
            if(rowData.length > 0){
                await fetch(`${developmentUrl}/api/sellorder/${rowData[0]}`)
                    .then(res => res.json())
                    .then(data => setSellData(data.sellOrderInfo))
            } else {
                return;
            }
        }
        getInfo()
    }, [rowData])

    console.log(sellData);
    
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className="simple-modal-title">Order Information</h2>
      <p className="simple-modal-description">External Order Number: {sellData.externalOrderNumber}</p>
      <p className="simple-modal-description">Buyer Full Name: {sellData.buyerFullName}</p>
      <p className="simple-modal-description">Buyer Phone Number: {sellData.buyerPhoneNumber}</p>
      <p className="simple-modal-description">Buyer Email: {sellData.buyerEmail}</p>
      <h2 className="simple-modal-title">Shipping Info</h2>
      <p className="simple-modal-description">Shipping Address: {sellData.shippingAddress}</p>
      <p className="simple-modal-description">Shipping City: {sellData.shippingCity}</p>
      <p className="simple-modal-description">Shipping Region: {sellData.shippingRegion}</p>
      <p className="simple-modal-description">Shipping Country: {sellData.shippingCountry}</p>
      <h2 className="simple-modal-title">Promise Dates</h2>
      <button onClick={() => setOpenModal(false)}>Cerrar</button>
    </div>
  );

  return (
    <div>
      <Modal
        open={openModal}
        onClose={openModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SimpleModal;