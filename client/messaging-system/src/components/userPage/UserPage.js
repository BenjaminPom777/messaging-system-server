import React from 'react'
import { useSelector } from 'react-redux'

export default function UserPage() {
    const { user } = useSelector(state => state)
    return (
        <div>
            <p>Your Profile: {user.email}</p>
            <p>your id: {user.userId}</p>
        </div>
    )
}
