"use client";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    useTheme,
    useMediaQuery,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { customApplications } from "./applications";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";

export default function CustomApplications() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        business: "",
        website: "",
        budget: "",
        challenges: "",
        assistance: "",
        contactMethod: "email",
        contactValue: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState(false);

    const isValidContact = validateContact(
        formData.contactMethod,
        formData.contactValue,
    );
    const showError = touched && formData.contactValue !== "" && !isValidContact;

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidContact) return;
        setSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("business", formData.business);
            submitData.append("website", formData.website);
            submitData.append("budget", formData.budget);
            submitData.append("challenges", formData.challenges);
            submitData.append("assistance", formData.assistance);
            submitData.append("contactMethod", formData.contactMethod);
            submitData.append("contactValue", formData.contactValue);

            const res = await fetch("/api/form-hook", {
                method: "POST",
                body: submitData,
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    if (submitted) return <SuccessMessage />;

    if (submitting) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.palette.background.default,
                    zIndex: 9999,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
                bgcolor: "background.default",
            }}
        >
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Custom Applications
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 8, textAlign: isMobile ? "justify" : "center" }}
                >
                    Tailor-made software solutions designed to meet your specific business needs.
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    fontWeight="bold"
                    color="text.primary"
                    sx={{ mb: 4 }}
                >
                    Past Projects
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    {customApplications.map((app, index) => {
                        const Icon = app.icon;

                        return (
                            <Grid
                                item
                                xs={12}
                                md={8}
                                key={app.title}
                                sx={{ display: "flex" }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    style={{ width: "100%" }}
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            bgcolor: "background.paper",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: { xs: "200px", md: "300px" },
                                                overflow: "hidden",
                                                bgcolor: "background.paper",
                                            }}
                                        >
                                            <Image
                                                src={app.media.src}
                                                alt={app.media.alt}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                                <Icon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                                                <Typography variant="h4" component="h2">
                                                    {app.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle1" color="text.secondary" paragraph>
                                                {app.description}
                                            </Typography>
                                            <List>
                                                {app.features.map((feature) => (
                                                    <ListItem key={feature} sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                                            <CheckCircleIcon color="primary" fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={feature} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                        <CardActions sx={{ p: 2, pt: 0 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                href="https://www.o11n.life/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                endIcon={<OpenInNewIcon />}
                                            >
                                                Visit Project
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Application Discovery Form */}
                <Card
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        mt: 8,
                        p: { xs: 3, md: 5 },
                        bgcolor: "background.paper",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        fontWeight="bold"
                        color="text.primary"
                    >
                        Free Application Discovery Session
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Let&apos;s explore how a custom-built application can solve your unique business challenges. During this session, we will:
                    </Typography>
                    <List sx={{ mb: 4 }}>
                        <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Typography variant="body1">•</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary="Understand your business processes and identify where custom software can add the most value."
                                primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Typography variant="body1">•</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary="Discuss your technical requirements, integrations, and scalability needs."
                                primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Typography variant="body1">•</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary="Review similar projects we've built and how they can be adapted for your needs."
                                primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Typography variant="body1">•</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary="Provide a timeline estimate and development approach for your custom application."
                                primaryTypographyProps={{
                                    variant: "body2",
                                    color: "text.secondary",
                                }}
                            />
                        </ListItem>
                    </List>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Company Name"
                                    value={formData.business}
                                    onChange={(e) => handleChange("business", e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Current Website or App (Optional)"
                                    value={formData.website}
                                    onChange={(e) => handleChange("website", e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Project Budget Range"
                                    value={formData.budget}
                                    onChange={(e) => handleChange("budget", e.target.value)}
                                    variant="outlined"
                                >
                                    <MenuItem value="$10000-$25000">$10,000-$25,000</MenuItem>
                                    <MenuItem value="$25000-$50000">$25,000-$50,000</MenuItem>
                                    <MenuItem value="$50000+">$50,000+</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    multiline
                                    rows={3}
                                    label="What business problem are you trying to solve with custom software?"
                                    value={formData.challenges}
                                    onChange={(e) => handleChange("challenges", e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    multiline
                                    rows={3}
                                    label="Describe your ideal solution and key features you need"
                                    value={formData.assistance}
                                    onChange={(e) => handleChange("assistance", e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                                    Preferred Contact Method *
                                </Typography>
                                <RadioGroup
                                    row
                                    value={formData.contactMethod}
                                    onChange={(e) =>
                                        handleChange("contactMethod", e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="email"
                                        control={<Radio />}
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        value="sms"
                                        control={<Radio />}
                                        label="SMS"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label={formData.contactMethod === "email" ? "Email" : "Phone"}
                                    value={formData.contactValue}
                                    onChange={(e) => handleChange("contactValue", e.target.value)}
                                    onBlur={() => setTouched(true)}
                                    variant="outlined"
                                    error={showError}
                                    helperText={
                                        showError
                                            ? formData.contactMethod === "email"
                                                ? "Invalid email format"
                                                : "Invalid phone format"
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={
                                        !isValidContact ||
                                        !formData.name ||
                                        !formData.business ||
                                        !formData.challenges ||
                                        !formData.assistance
                                    }
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    Request Discovery Session
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}
