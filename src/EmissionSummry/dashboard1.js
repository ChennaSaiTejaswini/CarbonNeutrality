import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { EnergySavingsLeaf, Bolt } from '@mui/icons-material';
import predictedYearlyData from './predicted_yearly_data.json';

const EmissionPrediction = () => {
    const [cleanTech, setCleanTech] = useState('Electric Vehicles');
    const [altEnergy, setAltEnergy] = useState('Solar Energy');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [chartData, setChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [methaneChartData, setMethaneChartData] = useState([]);

    const COLORS = ['#0088FE', '#00C49F'];

    useEffect(() => {
        // Process data for line chart (converting to million tons for carbon emission)
        const formattedData = Object.entries(predictedYearlyData).map(([year, data]) => ({
            year: parseInt(year),
            'total emission': data['total emission'] / 1000000,
            'fuel emission': data['fuel emission'] / 1000000,
            'electricity emission': data['electricity emission'] / 1000000,
            'methane emission': data['methane emission (m3)'] / 1000000, // Methane emission in million m3
        }));
        setChartData(formattedData);

        // Process data for pie chart of the selected year (carbon emissions)
        const yearData = predictedYearlyData[selectedYear];
        setPieChartData([
            { name: 'Fuel Emission', value: yearData['fuel emission'] / 1000000 },
            { name: 'Electricity Emission', value: yearData['electricity emission'] / 1000000 },
        ]);

        // Process data for methane emission chart
        setMethaneChartData(Object.entries(predictedYearlyData).map(([year, data]) => ({
            year: parseInt(year),
            'methane emission': data['methane emission (m3)'] / 1000000, // Convert to million m3
        })));
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleApplyClick = () => {
        console.log('Clean Tech:', cleanTech, 'Alt Energy:', altEnergy);
    };

    return (
        <Box p={4} bgcolor="#f4f6f8">
            <Typography variant="h4" gutterBottom textAlign="center" mb={3}>
                Carbon Emission Prediction
            </Typography>

            {/* Carbon Emission Section */}
            <Grid container spacing={4} justifyContent="center">
                {/* Yearly Emission Data (Carbon) */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', }, }}>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            Yearly Emission Data
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis unit=" MT" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="total emission" stroke="#8884d8" strokeWidth={2} />
                                <Line type="monotone" dataKey="fuel emission" stroke="#82ca9d" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="electricity emission" stroke="#ffc658" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Activity-wise Emission Prediction (Carbon) */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', }, }}>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            Activity-wise Emission Prediction
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Year</TableCell>
                                        <TableCell align="right">Fuel Emission (MT)</TableCell>
                                        <TableCell align="right">Electricity Emission (MT)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(predictedYearlyData).map(([year, data], index) => (
                                        <TableRow key={year} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', '&:hover': { backgroundColor: '#f1f1f1', }, }}>
                                            <TableCell>{year}</TableCell>
                                            <TableCell align="right">{(data['fuel emission'] / 1000000).toFixed(2)}</TableCell>
                                            <TableCell align="right">{(data['electricity emission'] / 1000000).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Box mt={4} p={3}>
                <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px',transition: 'transform 0.3s, box-shadow 0.3s', 
                            '&:hover': {
                                transform: 'scale(1.02)', 
                                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', 
                            }, }}>
                    {/* Dropdowns and Apply button */}
                    <Box
                        mt={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl
                            variant="standard"
                            sx={{
                                minWidth: 150,
                                marginRight: 3,
                                backgroundColor: '#f9f9f9',
                                borderRadius: 2,
                                padding: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                
                            }}
                        >
                            <EnergySavingsLeaf sx={{ marginRight: 1, color: 'green' }} />
                            <InputLabel id="clean-tech-label">Clean Technologies</InputLabel>
                            <Select
                                labelId="clean-tech-label"
                                id="clean-tech"
                                value={cleanTech}
                                onChange={(e) => setCleanTech(e.target.value)}
                                label="Clean Technologies"
                            >
                                <MenuItem value="Electric Vehicles">Electric Vehicles</MenuItem>
                                <MenuItem value="Wind Turbines">Wind Turbines</MenuItem>
                                <MenuItem value="Hydrogen Energy">Hydrogen Energy</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="standard"
                            sx={{
                                minWidth: 150,
                                marginRight: 3,
                                backgroundColor: '#f9f9f9',
                                borderRadius: 2,
                                padding: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Bolt sx={{ marginRight: 1, color: 'orange' }} />
                            <InputLabel id="alt-energy-label">Alternative Energy</InputLabel>
                            <Select
                                labelId="alt-energy-label"
                                id="alt-energy"
                                value={altEnergy}
                                onChange={(e) => setAltEnergy(e.target.value)}
                                label="Alternative Energy"
                            >
                                <MenuItem value="Solar Energy">Solar Energy</MenuItem>
                                <MenuItem value="Wind Energy">Wind Energy</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={handleApplyClick}
                            sx={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white' }}
                        >
                            Apply
                        </Button>
                    </Box>

                    <Typography variant="h6" textAlign="center" gutterBottom>
                        Emission Reduction Strategies
                    </Typography>
                    <Typography variant="body1" textAlign="center" gutterBottom>
                        To reduce emissions, focus on increasing the use of clean technologies such as electric vehicles, wind turbines, and solar energy.
                        Explore alternative energy options and reduce dependency on fossil fuels. Implement energy efficiency measures across industries.
                    </Typography>
                </Paper>
            </Box>

            {/* Methane Emission Section */}
            <Typography variant="h4" gutterBottom textAlign="center" mt={6} mb={3}>
                Methane Emission Prediction
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {/* Methane Emission Line Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', }, }}>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            Yearly Methane Emission Data
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={methaneChartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis unit=" million m3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="methane emission" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Methane Emission Table */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', }, }}>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            Year-wise Methane Emission Data
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Year</TableCell>
                                        <TableCell align="right">Methane Emission (million m3)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(predictedYearlyData).map(([year, data], index) => (
                                        <TableRow key={year} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', '&:hover': { backgroundColor: '#f1f1f1', }, }}>
                                            <TableCell>{year}</TableCell>
                                            <TableCell align="right">{(data['methane emission (m3)'] / 1000000).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Emission Reduction Strategies */}
            <Box mt={4} p={3}>
                <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: '10px', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', }, }}>
                    <Typography variant="h6" textAlign="center" gutterBottom>
                        Methane Emission Reduction Strategies
                    </Typography>
                    <Typography variant="body1" textAlign="center" gutterBottom>
                        Reducing methane emissions involves capturing and converting methane from landfills, agriculture, and the energy sector. 
                        Implementing methane capture technology at oil and gas facilities, and improving waste management systems can lead to significant reductions.
                    </Typography>

                    
                </Paper>
            </Box>
        </Box>
    );
};

export default EmissionPrediction;
