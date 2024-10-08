import csv
import shutil


def _parse(file):
    # Open the input CSV file for reading
    with open(f"./client/src/content/{file}.csv", newline='') as input_file:
        reader = csv.reader(input_file)
        
        # Create a list to store the modified data
        modified_data = []

        # Loop through the CSV rows, make changes, and store them in modified_data
        for row in reader:
            # Modify the data as needed; for example, adding 'Modified' to each cell
            modified_row = [cell for cell in row]
            modified_data.append(modified_row)

    # Create a temporary file
    temp_file = f"temp_{file}.csv"

    # Write the modified data to the temporary file
    with open(temp_file, mode='w', newline='') as output_file:
        writer = csv.writer(output_file)
        
        # Write the modified data to the temporary file
        for row in modified_data:
            writer.writerow(row)

    # Replace the original file with the temporary file
    shutil.move(temp_file, f"./client/src/content/{file}.csv") 


_parse("pizza")
_parse("openingDates")
_parse('desserts')