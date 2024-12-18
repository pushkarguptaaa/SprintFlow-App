"use client"

import OrgSwitcher from "@/components/org-switcher"
import { useOrganization, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const CreateProjectPage = () => {
    const { isLoaded: isOrgLoaded, membership } = useOrganization()
    const { isLoaded: isUserLoaded } = useUser()
    const [ isAdmin, setIsAdmin ] = useState(false)

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver
    })

    useEffect(() => {
        if(isOrgLoaded && isUserLoaded && membership) {
            setIsAdmin(membership.role === "org:admin")
        }
    },[isOrgLoaded, isUserLoaded, membership])

    if(!isOrgLoaded || !isUserLoaded) return null

    const onSubmit = async () => {

    }

    if(!isAdmin) {
        return <div className="flex flex-col gap-2 items-center">
            <span className="text-2xl gradient-title">Oops! Only Admins can create projects.</span>
            <OrgSwitcher />
        </div>
    }

  return (
    <div className="container mx-auto py-10">
        <h1 className="text-6xl text-center font-bold mb-8 gradient-title">Create New Project</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                    id="name"
                    {...register("name")}
                    className="bg-slate-950"
                    placeholder="Project Name"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <Input
                    id="key"
                    {...register("key")}
                    className="bg-slate-950"
                    placeholder="Project Key (Ex: RCYT)"
                />
                {errors.key && (
                    <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
                )}
            </div>

            <div>
                <Textarea
                    id="description"
                    {...register("description")}
                    className="bg-slate-950 h-28"
                    placeholder="Project Description"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            <Button type="submit" size="lg" className="bg-blue-500 text-white">
                Create Project
            </Button>
        </form>
    </div>
  )
}

export default CreateProjectPage