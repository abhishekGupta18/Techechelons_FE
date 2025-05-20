import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../utils/constant';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const AddProject = () => {
    const [selectedSkills, setSelectedSkills] = useState(null);
    const [selectedMember, setSelectedMembers] = useState(null);
    const [checked, setChecked] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});

    const skills = [
        { name: 'Asp.Net' },
        { name: 'PHP' },
        { name: 'Java' },
        { name: 'ReactJs' },
        { name: 'React Native' },
        { name: 'AngularJs' },
        { name: 'NodeJs' },
        { name: 'PWA' },
        { name: 'Flutter' },
        { name: 'VueJs' },
        { name: 'Vanilla Js' },
        { name: 'SQL Server' },
        { name: 'My SQL' },
        { name: 'MongoDB' },
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JavaScript/jQuery' }
    ];

    const members = [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5 or 5+' }
    ];

    const validate = () => {
        const newErrors = {};

        if (!selectedSkills || selectedSkills.length === 0) {
            newErrors.skills = 'Please select at least one skill';
        }

        if (!selectedMember) {
            newErrors.members = 'Please select number of members';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // Extract skill names from the selectedSkills objects
            const skillNames = selectedSkills.map(skill => skill.name);

            const projectData = {
                projectName,
                description,
                skills: skillNames,
                isActive: checked,
                members: selectedMember.name
            };

            const response = await axios.post(
                `${baseURL}/add-project`,
                projectData,
                { withCredentials: true }
            );

            setMessage({ type: 'success', text: 'Project added successfully!' });

            // Reset form after successful submission
            setProjectName("");
            setDescription("");
            setSelectedSkills(null);
            setSelectedMembers(null);
            setChecked(false);
            setErrors({});

            console.log('Project added:', response.data);
        } catch (error) {
            setMessage({ type: 'error', text: `Error: ${error.response?.data?.error || error.message}` });
            console.error('Error adding project:', error);
        } finally {
            setLoading(false);
        }
    };

    // Custom styling for PrimeReact components
    const dropdownStyle = {
        container: { width: '100%' }
    };

    // Custom template for multiselect items to look cleaner
    const skillItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <span>{option.name}</span>
            </div>
        );
    };

    // Template for selected skills
    const selectedSkillsTemplate = (options) => {
        if (options && options.length > 0) {
            if (options.length <= 2) {
                return options.map(option => option.name).join(', ');
            } else {
                return `${options.length} skills selected`;
            }
        }
        return 'Select Skills';
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 bg-sky-50 rounded-lg shadow-md my-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-sky-800">Add a new project</h2>

            {message && (
                <div className={`p-3 sm:p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-sky-100 text-sky-700 border border-sky-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Project Name"
                        className="w-full p-2 sm:p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Write project description"
                        className="w-full p-2 sm:p-3 border border-sky-200 rounded-md h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Skills selection - more space above this section */}
                <div className="pt-4">
                    <label className="block text-sm font-medium text-sky-700 mb-2">Select Skills*</label>
                    <div className="p-field">
                        <MultiSelect
                            value={selectedSkills}
                            onChange={(e) => {
                                setSelectedSkills(e.value);
                                if (errors.skills) {
                                    const newErrors = { ...errors };
                                    delete newErrors.skills;
                                    setErrors(newErrors);
                                }
                            }}
                            options={skills}
                            optionLabel="name"
                            display="chip"
                            placeholder="Select Skills"
                            selectedItemsLabel={selectedSkillsTemplate}
                            itemTemplate={skillItemTemplate}
                            className={`w-full ${errors.skills ? 'p-invalid' : ''}`}
                            style={dropdownStyle.container}
                            panelClassName="bg-white shadow-lg border border-sky-200 rounded-md"
                            scrollHeight="250px"
                        />
                        {errors.skills && <small className="text-red-500">{errors.skills}</small>}
                    </div>
                </div>

                {/* Members selection - significant space above this section */}
                <div className="pt-8 pb-4">
                    <label className="block text-sm font-medium text-sky-700 mb-2">Number of Members*</label>
                    <div className="p-field">
                        <Dropdown
                            value={selectedMember}
                            onChange={(e) => {
                                setSelectedMembers(e.value);
                                if (errors.members) {
                                    const newErrors = { ...errors };
                                    delete newErrors.members;
                                    setErrors(newErrors);
                                }
                            }}
                            options={members}
                            optionLabel="name"
                            placeholder="Select number of members"
                            className={`w-full ${errors.members ? 'p-invalid' : ''}`}
                            style={dropdownStyle.container}
                            panelClassName="bg-white shadow-lg border border-sky-200 rounded-md"
                            scrollHeight="200px"
                        />
                        {errors.members && <small className="text-red-500">{errors.members}</small>}
                    </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        onChange={e => setChecked(e.checked)}
                        checked={checked}
                        id="isActive"
                    />
                    <label htmlFor="isActive" className="text-sky-800 cursor-pointer">Is Active?</label>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600 transition-colors disabled:bg-sky-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <Link to="/" className="w-full sm:w-auto">
                        <button
                            type="button"
                            className="w-full px-4 sm:px-6 py-2 bg-gray-200 text-sky-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddProject;