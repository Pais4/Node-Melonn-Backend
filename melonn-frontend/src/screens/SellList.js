import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid';
import {developmentUrl} from '../utils/urls'
import './SellList.css'
import Modal from '../components/Modal/Modal';

const SellList = () => {

    const [ordersData, setOrdersData] = useState([])
    const [rowData, setRowData] = useState([])
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {

        const getAllOrders = async() => {
            fetch(`${developmentUrl}/api/sellorder`)
                .then(res => res.json())
                .then(data => setOrdersData(data.getSellOrders))
        }

        getAllOrders()

    }, [])

    const columns = [
        { field: 'externalOrderNumber', headerName: 'External Order Number', width: 200 },
        { field: 'sellerStore', headerName: 'Seller Store', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'shippingMethod', headerName: 'Shipping Method', width: 250 },
    ];

    return (
        <div>
            <header>
                <h1>Sell Order List</h1>
            </header>
            <div style={{ height: '60vh', width: '100%' }}>
                <DataGrid 
                    rows={ordersData}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setRowData(newSelection.selectionModel);
                        setOpenModal(true)
                        
                    }}
                />
            </div>
            <div className='return__container'>
                <Link to='/'>
                    <button 
                        className='move__btn'
                    >Create Sell Order</button>
                </Link>
            </div>
            <Modal rowData={rowData} openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
    )
}

export default SellList
