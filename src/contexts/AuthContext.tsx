import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Clinic {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  selectedClinic: Clinic | null;
  clinics: Clinic[];
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  selectClinic: (clinic: Clinic) => void;
  clearClinicSelection: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CLINICS: Clinic[] = [
  { id: '1', name: 'Downtown Medical', avatar: '/src/assets/clinic-1.png', color: 'from-indigo-500 to-purple-600' },
  { id: '2', name: 'Wellness Center', avatar: '/src/assets/clinic-2.png', color: 'from-emerald-500 to-teal-600' },
  { id: '3', name: 'Dental Care', avatar: '/src/assets/clinic-3.png', color: 'from-amber-500 to-orange-600' },
  { id: '4', name: 'Sports Rehab', avatar: '/src/assets/clinic-4.png', color: 'from-sky-500 to-blue-600' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('demo_user');
    const savedClinic = localStorage.getItem('demo_clinic');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedClinic) setSelectedClinic(JSON.parse(savedClinic));
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - accepts any email/password
    if (email && password) {
      const demoUser = { id: '1', email, name: email.split('@')[0] };
      setUser(demoUser);
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    setSelectedClinic(null);
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_clinic');
  };

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    localStorage.setItem('demo_clinic', JSON.stringify(clinic));
  };

  const clearClinicSelection = () => {
    setSelectedClinic(null);
    localStorage.removeItem('demo_clinic');
  };

  return (
    <AuthContext.Provider value={{
      user,
      selectedClinic,
      clinics: DEMO_CLINICS,
      isAuthenticated: !!user,
      signIn,
      signOut,
      selectClinic,
      clearClinicSelection,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
