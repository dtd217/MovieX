import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// Public protected route
const ProtectedRouter = () => {
   const { userInfo } = useSelector((state) => state.userLogin)
   return userInfo?.token ? <Outlet /> : <Navigate to="/login" />
}

// Admin protected route
const AdminProtectedRouter = () => {
   const { userInfo } = useSelector((state) => state.userLogin)
   return userInfo?.token && userInfo?.isAdmin ? <Outlet /> : <Navigate to="/" />
}

export { ProtectedRouter, AdminProtectedRouter }