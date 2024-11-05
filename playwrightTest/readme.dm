    SELECT *
    FROM Customers 
    WHERE City = 'London';

    SELECT DISTINCT City
    FROM Customers; 
    
    SELECT *
    FROM Customers
    WHERE PostsalCode LIKE '0%';

    SELECT * FROM Customers
    WHERE NOT Country = 'USA';

    SELECT * FROM Customers
    WHERE Country = 'France'
    Order by ContactName desc;

    SELECT Top 10 * FROM Customers
    WHERE Country IN ('Germany', 'USA');

    SELECT Top 10 * FROM Customers
    WHERE Country = 'Germany' or Country =  'USA';

    SELECT ProductName, Price FROM Products
    WHERE Price > 22;

    SELECT * FROM Products
    WHERE SupplierID = 7 
    Order by price desc;

    SELECT * FROM Employees
    WHERE BirthDate > '01/01/1960';

    SELECT * FROM OrderDetails
    WHERE OrderID Between 10248 and 10272;

    




