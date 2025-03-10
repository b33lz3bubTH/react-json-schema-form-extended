import { createTheme, MantineProvider } from '@mantine/core';
import './App.css'

import { fields } from './form/fields'
import { MediaUploadForm } from './pages/mediaUpload';

function App() {
  console.log("fields: ", fields);
  const theme = createTheme({
    /** Your theme override here */
  });
  return (
    <>
      <MantineProvider theme={theme}>
        <MediaUploadForm />
      </MantineProvider>
    </>
  )
}

export default App
