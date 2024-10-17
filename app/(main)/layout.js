import MainHeader from "@/components/main/header";

export default function RootLayout({ children }) {
    return (
        <>
          <MainHeader/>
          {children}
        </>
      
          
      
    );
  }