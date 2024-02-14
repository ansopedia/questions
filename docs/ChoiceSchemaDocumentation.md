# Choice Schema Documentation

## Overview

The `Choice` schema represents individual choices for a question in a quiz application. Each choice consists of the text, information about whether it is correct or not, and additional metadata for analysis. The schema includes fields for tracking the frequency of selection and an audit trail to monitor creation and updates.

## Core Choice Information

- **text:** The text of the choice.
- **isCorrect:** Indicates whether the choice is the correct answer.
- **feedback:** An array of feedback messages related to the choice.

## Metadata for Analysis

- **selectionFrequency:** The number of times the choice has been selected.

## Audit Trail

- **createdBy:** The user who created the choice.
- **updatedBy:** The user who last updated the choice.
- **createdAt:** The timestamp when the choice was created.
- **updatedAt:** The timestamp when the choice was last updated.

## Usage

The `Choice` schema is designed to be used in conjunction with questions in a quiz application. It provides a structured way to represent and analyze individual choices. The timestamps feature allows for tracking the creation and update history of each choice.
