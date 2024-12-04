Certainly! Below is a comprehensive example of using TanStack Query (formerly known as React Query) in a TypeScript React application to implement a CRUD (Create, Read, Update, Delete) functionality. This example demonstrates how to set up queries and mutations for managing a simple resource (e.g., users).

### Setting Up

1. **Install Dependencies**:
   Make sure you have the required packages:
   ```bash
   npm install @tanstack/react-query axios
   ```

2. **Create a User API Service**:
   Create a file named `userService.ts` to handle API calls.

   ```typescript
   // userService.ts
   import axios from 'axios';

   const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Example API

   export const fetchUsers = async () => {
     const response = await axios.get(API_URL);
     return response.data;
   };

   export const createUser = async (user: { name: string; email: string }) => {
     const response = await axios.post(API_URL, user);
     return response.data;
   };

   export const updateUser = async (id: number, user: { name: string; email: string }) => {
     const response = await axios.put(`${API_URL}/${id}`, user);
     return response.data;
   };

   export const deleteUser = async (id: number) => {
     await axios.delete(`${API_URL}/${id}`);
   };
   ```

3. **Set Up TanStack Query**:
   Create a file named `QueryClientProvider.tsx` to wrap your application with the Query Client.

   ```typescript
   // QueryClientProvider.tsx
   import React from 'react';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

   const queryClient = new QueryClient();

   const MyQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
   };

   export default MyQueryClientProvider;
   ```

4. **Create the Main Component**:
   Now, create a component that uses TanStack Query for CRUD operations.

   ```typescript
   // App.tsx
   import React, { useState } from 'react';
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { fetchUsers, createUser, updateUser, deleteUser } from './userService';
   import MyQueryClientProvider from './QueryClientProvider';

   const App: React.FC = () => {
     const queryClient = useQueryClient();
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [editId, setEditId] = useState<number | null>(null);

     // Fetch users
     const { data: users, isLoading, isError } = useQuery(['users'], fetchUsers);

     // Create user mutation
     const createUserMutation = useMutation(createUser, {
       onSuccess: () => {
         queryClient.invalidateQueries(['users']);
       },
     });

     // Update user mutation
     const updateUserMutation = useMutation(updateUser, {
       onSuccess: () => {
         queryClient.invalidateQueries(['users']);
       },
     });

     // Delete user mutation
     const deleteUserMutation = useMutation(deleteUser, {
       onSuccess: () => {
         queryClient.invalidateQueries(['users']);
       },
     });

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (editId) {
         updateUserMutation.mutate({ id: editId, user: { name, email } });
         setEditId(null);
       } else {
         createUserMutation.mutate({ name, email });
       }
       setName('');
       setEmail('');
     };

     const handleEdit = (user: any) => {
       setEditId(user.id);
       setName(user.name);
       setEmail(user.email);
     };

     return (
       <div>
         <h1>Users</h1>
         {isLoading && <p>Loading...</p>}
         {isError && <p>Error fetching users!</p>}
         <ul>
           {users?.map((user: any) => (
             <li key={user.id}>
               {user.name} - {user.email}
               <button onClick={() => handleEdit(user)}>Edit</button>
               <button onClick={() => deleteUserMutation.mutate(user.id)}>Delete</button>
             </li>
           ))}
         </ul>
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Name"
             required
           />
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Email"
             required
           />
           <button type="submit">{editId ? 'Update' : 'Create'}</button>
         </form>
       </div>
     );
   };

   const MainApp = () => (
     <MyQueryClientProvider>
       <App />
     </MyQueryClientProvider>
   );

   export default MainApp;
   ```

### Explanation

1. **API Service**: The `userService.ts` file defines functions for CRUD operations. Each function uses `axios` to make HTTP requests.

2. **Query Client Provider**: The `MyQueryClientProvider` wraps the application, allowing the use of TanStack Query throughout.

3. **Main Component**: 
   - **Fetching Data**: The `useQuery` hook fetches users from the API.
   - **Creating, Updating, and Deleting Users**: The `useMutation` hook is used for create, update, and delete operations. Each mutation invalidates the `users` query cache to refresh the user list.
   - **Form Handling**: The component maintains form state and submits it for creating or updating users.

4. **Editing Users**: When clicking the "Edit" button, the user's data populates the form for editing.

### Run the Application

You can run the application using:

```bash
npm start
```

This setup provides a solid foundation for managing user data using TanStack Query and TypeScript in a React application. You can expand it further based on your specific requirements.