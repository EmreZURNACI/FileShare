package Functions

import (
	"archive/zip"
	"io"
	"os"
	"path/filepath"
)

func ZipFiles(zipFilePath string, files []string) error {
	zipFile, err := os.Create(zipFilePath)
	if err != nil {
		return err
	}
	defer zipFile.Close()

	zipWriter := zip.NewWriter(zipFile)
	defer zipWriter.Close()

	for _, file := range files {
		if err := addFileToZip(zipWriter, file); err != nil {
			return err
		}
	}
	return nil
}

func addFileToZip(zipWriter *zip.Writer, file string) error {
	f, err := os.Open(file)
	if err != nil {
		return err
	}
	defer f.Close()

	zipFileWriter, err := zipWriter.Create(filepath.Base(file))
	if err != nil {
		return err
	}

	if _, err := io.Copy(zipFileWriter, f); err != nil {
		return err
	}
	return nil
}
