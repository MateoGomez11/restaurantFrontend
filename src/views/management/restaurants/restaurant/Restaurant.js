import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react';

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await Axios({
        url: 'http://localhost:1337/api/listrestaurant',
      });
      const lstRestaurants = Object.keys(response.data).map(i => response.data[i]);
      setRestaurantData(lstRestaurants.flat());
    };

    getRestaurants();
  }, []);

  const handleCreateRestaurant = () => {
    navigate('/restaurants/restaurantform');
  };

  function handleEdit(restaurantId){
    navigate(`/restaurants/restaurantEditForm/${restaurantId}`)
  }

 

  const handleDelete = async(restaurant) => {
    try {
      var url = "http://localhost:1337/api/disablerestaurant" + restaurantId;
      const response = await Axios.put(url);
      window.location.reload();
    }
    catch (e) {
      console.log(e);
    }
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'restaurantName',
    },
    {
      title: 'NIT',
      dataIndex: 'restaurantNit',
    },
    {
      title: 'Address',
      dataIndex: 'restaurantAddress',
    },
    {
      title: 'Phone',
      dataIndex: 'restaurantPhone',
    },
    {
      title: 'City',
      dataIndex: 'cityId',
    },
    {
      title: 'Options',
      render: (restaurant) => (
        <div>
          <CButton color="primary" onClick={() => handleEdit(restaurant.id)}>
            Edit
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(restaurant)}>
            Delete
          </CButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}>New Restaurant</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurantData.map((restaurant, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => {
                if (column.render) {
                  return <CTableDataCell key={columnIndex}>{column.render(restaurant)}</CTableDataCell>;
                } else {
                  return <CTableDataCell key={columnIndex}>{restaurant[column.dataIndex]}</CTableDataCell>;
                }
              })}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default Restaurant;
