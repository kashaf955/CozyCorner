import React from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader } from '../components'
import { Avatar, Box, Typography, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { Mail, Lock, Person } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { clearErrors, updateProfile } from '../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Profile = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(user.avatar)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('avatar', avatar)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Profile updated successfully')
            dispatch(loadUser())
        }
    }, [dispatch, error, isUpdated])
    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit(updateProfileSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" {...register('name', { required: true })} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email', { required: true })} />
        </div>
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" id="avatar" {...register('avatar', { required: true })} />
                </div>
                <button type="submit" disabled={loading}>Update</button>
            </form>
            {error && <p>{error}</p>}
            {isUpdated && <p>Profile updated successfully</p>}
            {loading && <Loader />}
        </div>
    )
};
export default Profile;