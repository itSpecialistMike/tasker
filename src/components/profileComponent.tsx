"use client";

import { useUserContext } from "@/context/UserContext";


export default function ProfileComponent() {
    const { user } = useUserContext();
    return (
        <div className="rounded-4xl p-10 mx-auto w-full max-w-6xl my-20 shadow-2xl bg-white space-y-20 ">
            <section className="flex gap-10">
                <section className="flex flex-col gap-2">
                    <div className="">
                        {user?.surname} {user?.name } {user?.middlename}
                    </div>
                    <div>
                        Login: {user?.login}
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <div className="">
                        ID роли{user?.roleID}
                    </div>
                    <div>
                        Login: {user?.login}
                    </div>
                </section>
            </section>
        </div>
    )
}