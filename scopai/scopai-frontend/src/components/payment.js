import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PaymentForm = () => {
    const subscribe = localStorage.getItem("subscribed_user");
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("user") || subscribe === true){
            navigate('/')
        }
    },[navigate])
  const [formData, setFormData] = useState({
    pm_card_token: '',
    expiry_month: '',
    expiry_year: '',
    cvc: '',
    selected_plan: '',
    email: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8000/api/make_payment', formData);
      console.log(response.data);
      if(response.data.status === 201){
          localStorage.setItem("subscription", true)
      }
      // Handle success response
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle error response
    }
  };

//   {subscribe === "false" &&
return(

    <div className='container'>
        <div className='d-flex justify-content-center align-item-center card p-5 mt-5'>
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Card Token:
          <input type="text" name="pm_card_token" value={formData.pm_card_token} onChange={handleChange} />
        </label>
        <br />
        <label>
        Expiry Month:
        <input type="text" name="expiry_month" value={formData.expiry_month} onChange={handleChange} />
        </label>
        <br />
        <label>
        Expiry Year:
        <input type="text" name="expiry_year" value={formData.expiry_year} onChange={handleChange} />
        </label>
        <br />
        <label>
        CVC:
        <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} />
        </label>
        <br />
        <label>
        Selected Plan:
        <select name="selected_plan" value={formData.selected_plan} onChange={handleChange}>
        <option value="advertiser">Advertiser</option>
        <option value="developer">Developer</option>
        <option value="both">Both</option>
        </select>
        </label>
        <br />
        <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
        </div>
        </div>
    // }
    );
};

export default PaymentForm;
