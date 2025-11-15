CREATE TABLE [Users] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [email] varchar(150) UNIQUE,
  [password_hash] varchar(256),
  [role] varchar(20)
)
GO

CREATE TABLE [Patients] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int,
  [first_name] varchar(100),
  [last_name] varchar(100),
  [birth_date] date
)
GO

CREATE TABLE [Doctors] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int,
  [first_name] varchar(100),
  [last_name] varchar(100),
  [specialty] varchar(100)
)
GO

CREATE TABLE [Appointments] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [patient_id] int,
  [doctor_id] int,
  [start] datetime,
  [end] datetime,
  [status] varchar(50) DEFAULT 'Booked'
)
GO

CREATE TABLE [MedicalRecords] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [patient_id] int,
  [created_at] datetime DEFAULT (GETDATE()),
  [diagnosis] text,
  [notes] text
)
GO

ALTER TABLE [Patients] ADD FOREIGN KEY ([user_id]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Doctors] ADD FOREIGN KEY ([user_id]) REFERENCES [Users] ([id])
GO

ALTER TABLE [Appointments] ADD FOREIGN KEY ([patient_id]) REFERENCES [Patients] ([id])
GO

ALTER TABLE [Appointments] ADD FOREIGN KEY ([doctor_id]) REFERENCES [Doctors] ([id])
GO

ALTER TABLE [MedicalRecords] ADD FOREIGN KEY ([patient_id]) REFERENCES [Patients] ([id])
GO
