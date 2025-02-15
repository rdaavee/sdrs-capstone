import { useState, useEffect } from "react";
import {
    fetchProvinces,
    fetchMunicipalities,
    fetchBarangays,
} from "../services/api";

const useLocationData = (setFormData) => {
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");

    useEffect(() => {
        const getProvinces = async () => {
            const data = await fetchProvinces();
            setProvinces(data);
        };
        getProvinces();
    }, []);

    const handleProvinceChange = async (e) => {
        const provinceName = e.target.selectedOptions[0].text;
        const provinceCode = e.target.value;

        setFormData((prev) => ({
            ...prev,
            province: provinceName,
            municipality: "",
            barangay: "",
        }));

        setSelectedProvince(provinceCode);
        setMunicipalities([]);
        setBarangays([]);

        if (!provinceCode) return;
        setMunicipalities(await fetchMunicipalities(provinceCode));
    };

    const handleMunicipalityChange = async (e) => {
        const municipalityName = e.target.selectedOptions[0].text;
        const municipalityCode = e.target.value;

        setFormData((prev) => ({
            ...prev,
            municipality: municipalityName,
            barangay: "",
        }));

        setSelectedMunicipality(municipalityCode);
        setBarangays([]);

        if (!municipalityCode) return;
        setBarangays(await fetchBarangays(municipalityCode));
    };

    const handleBarangayChange = (e) => {
        const barangayName = e.target.selectedOptions[0].text;
        setFormData((prev) => ({
            ...prev,
            barangay: barangayName,
        }));
    };

    return {
        provinces,
        municipalities,
        barangays,
        handleProvinceChange,
        handleMunicipalityChange,
        handleBarangayChange,
        selectedProvince,
        selectedMunicipality,
    };
};

export default useLocationData;
