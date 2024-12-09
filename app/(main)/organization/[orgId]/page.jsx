import { getOrganization } from '@/actions/organization'
import React from 'react'

const Organization = async ({params}) => {
    const {orgId} = params
    const organization = await getOrganization(orgId)

    if(!organization) return <div>Organization not found</div>
  
    return (
    <div>
        <div>
            <h1>{organization.name}'s Projects</h1>
        </div>
    </div>
  )
}

export default Organization