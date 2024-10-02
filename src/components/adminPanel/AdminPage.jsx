import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../redux/features/productSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (values) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, ...values }));
      setEditingProduct(null); 
    } else {
      dispatch(addProduct(values)).then(() => {
        setEditingProduct(null);
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <Formik
        initialValues={{
          title: editingProduct ? editingProduct.title : '',
          price: editingProduct ? editingProduct.price : '',
          description: editingProduct ? editingProduct.description : '',
          images: editingProduct ? editingProduct.image : '', // Ensure this is the correct property for the image
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          price: Yup.number().required('Required').positive('Must be a positive number'),
          description: Yup.string().required('Required'),
          images: Yup.string().url('Must be a valid URL').required('Required'),
        })}
        enableReinitialize 
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="mb-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <Field name="title" type="text" className="border p-2 w-full" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <Field name="price" type="number" className="border p-2 w-full" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <Field name="description" as="textarea" className="border p-2 w-full h-24" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium">Image URL</label>
              <Field name="images" type="text" className="border p-2 w-full" />
              <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>

      <h2 className="text-xl font-bold mt-8 mb-4">Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        toast.error(error)  
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <img 
                src={product.image} 
                alt={product.title} 
                className="mt-2 mb-4 w-full h-32 object-cover" 
              />
              <p className="text-sm text-gray-700">{product.description}</p>
              <div className="mt-4">
                <button onClick={() => handleEdit(product)} className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
