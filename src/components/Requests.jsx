import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) { }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res.data.data));
        } catch (err) { }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0)
        return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

    return (
        <div className="px-4 pt-8 md:pt-14 lg:pt-20 pb-10 text-center">
            <h1 className="font-bold text-white text-3xl mb-8">
                Connection Requests
            </h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    request.fromUserId;

                return (
                    <div
                        key={request._id}
                        className="
            bg-base-300 rounded-lg shadow-md
            w-full md:w-1/2
            mx-auto
            p-4 mb-6
            flex flex-col md:flex-row
            items-center md:items-start
            gap-4
          "
                    >
                        {/* Avatar */}
                        <img
                            alt="photo"
                            className="w-20 h-20 rounded-full object-cover"
                            src={photoUrl}
                        />

                        {/* Info */}
                        <div className="text-center md:text-left flex-1">
                            <h2 className="font-bold text-xl">
                                {firstName} {lastName}
                            </h2>
                            {age && gender && (
                                <p className="text-sm opacity-80">
                                    {age}, {gender}
                                </p>
                            )}
                            <p className="text-sm mt-1">{about}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 w-full md:w-auto justify-center md:justify-end">
                            <button
                                className="btn btn-primary btn-sm md:btn-md"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary btn-sm md:btn-md"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

};
export default Requests;