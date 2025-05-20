import axios from "axios"
import { baseURL } from "../../utils/constant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProjects } from "../../utils/projectSlice"
import { Link } from "react-router-dom"
import { Dialog } from 'primereact/dialog';


const Projects = () => {
    const dispatch = useDispatch()
    const projects = useSelector((store) => store.projects)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null)


    const fetchProjects = async () => {
        setLoading(true)
        try {
            const res = await axios.get(baseURL + "/allProjects", { withCredentials: true })
            dispatch(addProjects(res.data.data))
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (query) => {
        setLoading(true)
        try {
            const res = await axios.get(baseURL + `/projects/search?q=${query}`, { withCredentials: true })
            dispatch(addProjects(res.data.data))
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/project/delete/${id}`, { withCredentials: true });
            fetchProjects();
            setVisible(false);
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    console.log(projects)
    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 bg-sky-50 rounded-lg shadow-md my-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-sky-800">Projects</h2>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <Link to="/addProject">
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600 transition-colors cursor-pointer">
                        Add Project
                    </button>
                </Link>
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full p-2 sm:p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 pl-3 pr-10"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                            if (e.target.value.trim() === "") {
                                fetchProjects()
                            } else {
                                handleSearch(e.target.value)
                            }
                        }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                {loading ? (
                    <div className="py-10 text-center text-sky-600">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-300 border-t-sky-600 mb-2"></div>
                        <p>Loading projects...</p>
                    </div>
                ) : projects && projects.length > 0 ? (
                    <div className="block w-full overflow-x-auto">
                        <table className="min-w-full divide-y divide-sky-200">
                            <thead className="bg-sky-50">
                                <tr>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Project Name</th>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider hidden md:table-cell">Description</th>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider hidden sm:table-cell">Skills</th>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider hidden sm:table-cell">Members</th>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider hidden sm:table-cell">Is Active</th>
                                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-sky-100">
                                {projects.map((pro) => (
                                    <tr key={pro._id} className="hover:bg-sky-50">
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-sky-800">
                                            <div className="text-sm md:text-base">{pro?.projectName}</div>
                                            <div className="md:hidden text-xs text-sky-500 mt-1">
                                                <span className="inline-block mr-2">{pro.members} members</span>
                                                {Array.isArray(pro.skills) && pro.skills.length > 0 && (
                                                    <span className="inline-block">{pro.skills.slice(0, 2).join(', ')}{pro.skills.length > 2 ? '...' : ''}</span>
                                                )}
                                            </div>
                                            <div className="sm:hidden text-xs text-gray-500 mt-1 line-clamp-2">{pro.description}</div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-sky-700 max-w-xs truncate hidden md:table-cell">
                                            <div className="text-sm line-clamp-2">{pro.description}</div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {Array.isArray(pro.skills) ?
                                                    pro.skills.slice(0, 3).map((skill, index) => (
                                                        <span key={index} className="inline-block px-2 py-1 text-xs bg-sky-100 text-sky-700 rounded-full">
                                                            {skill}
                                                        </span>
                                                    )) :
                                                    <span className="text-sky-700 text-sm">{pro.skills}</span>
                                                }
                                                {Array.isArray(pro.skills) && pro.skills.length > 3 && (
                                                    <span className="inline-block px-2 py-1 text-xs bg-sky-100 text-sky-700 rounded-full">
                                                        +{pro.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-sky-700 hidden sm:table-cell text-sm">{pro.members}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pro.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {pro.isActive ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50 cursor-pointer"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setSelectedProjectId(pro._id);
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                                <Link to={`/edit/project/${pro._id}`}> <button className="text-sky-600 hover:text-sky-800 transition-colors p-1 rounded-full hover:bg-sky-50 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>



                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-10 text-center text-sky-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 .395.028.787.084 1.174a1.99 1.99 0 01-.242-.226 2 2 0 012.828-2.828c.187.187.364.37.504.559A7.96 7.96 0 0112 4c4.418 0 8 3.582 8 8s-3.582 8-8 8z" />
                        </svg>
                        <p className="text-lg">No projects found</p>
                        <p className="text-sm text-sky-500 mt-2">Try a different search or add a new project</p>
                    </div>
                )}
            </div>

            {/* Deletion Confirmation Modal */}
            <Dialog
                header="Confirm Deletion"
                visible={visible}
                onHide={() => setVisible(false)}
                style={{ width: '500px' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                className="border-round-lg shadow-lg"
                headerClassName="bg-sky-50 text-sky-800 font-bold pb-2"
                contentClassName="p-4 bg-white"
                footer={
                    <div className="flex justify-end gap-3 pt-2 pb-2 px-4 bg-gray-50 rounded-b-lg">
                        <button
                            onClick={() => setVisible(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(selectedProjectId)}
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
                        >
                            Delete Project
                        </button>
                    </div>
                }
            >
                <p className="text-center text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
            </Dialog>

        </div>
    )
}

export default Projects