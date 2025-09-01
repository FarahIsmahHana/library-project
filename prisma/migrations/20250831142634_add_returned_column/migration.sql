/*
  Warnings:

  - Made the column `pengarang` on table `loan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `loan` MODIFY `tglPinjam` DATETIME(3) NULL,
    MODIFY `tglKembali` DATETIME(3) NULL,
    MODIFY `pengarang` VARCHAR(191) NOT NULL;
