-- AlterTable
ALTER TABLE `Task` MODIFY `status` ENUM('ToDo', 'InProgress', 'Blocked', 'InQA', 'Done', 'Deployed') NOT NULL;
