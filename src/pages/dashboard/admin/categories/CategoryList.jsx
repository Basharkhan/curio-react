import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { categoryService } from '../../../../services/categoryService';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async() => {    
    try {
      setLoading(true);
      const respone = await categoryService.getAllCategories();
      console.log(respone);
      
    } catch (err) {
      setError("Failed to fetch tags");
      toast.error("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>CategoryList</div>
  )
}
